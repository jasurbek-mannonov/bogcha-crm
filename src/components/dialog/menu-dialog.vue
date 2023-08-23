<template>
  <el-dialog
    v-model="toggle"
    :title="`${convertDate(date, 1)} sanasidagi menyu`"
    width="50%"
    :before-close="handleClose"
  >
    <el-form
      ref="menuForm"
      :rules="rules"
      :model="menu"
      label-position="top"
      @submit.prevent="add(menuForm)"
    >
      <div v-if="false">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="Sanani tanlang"
          v-show="false"
          :disabled="true"
        />
      </div>
      <el-divider />
      <table class="el-table menu-table">
        <thead>
          <tr>
            <th>Nomi</th>
            <th>Vazni</th>
            <th>Sarflanadigan mahsulotlar</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) of menu" :key="index">
          <tr>
            <td colspan="3">
              <h4 class="text-center">{{ item.time_title }}</h4>
            </td>
          </tr>
          <tr v-for="(food, food_index) of item.foods" :key="food_index">
            <td>
              <el-select
                v-model="food._id"
                @change="get_food(food._id, index, food_index)"
                clearable
                filterable
              >
                <el-option
                  v-for="product of foods"
                  :key="product._id"
                  :label="product.title"
                  :value="product._id"
                />
              </el-select>
            </td>
            <td>{{ food.nettos }} gr</td>
            <td>{{ food.products?.toString() }}</td>
          </tr>
        </tbody>
      </table>
    </el-form>

    <template #footer>
      <span class="dialog-footer" @click="handleClose">
        <el-button> Bekor qilish </el-button>
        <el-button type="primary" @click="add(menuForm)"> Saqlash </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  date: {
    type: [Number, String],
  },
  // "title",
  //  "date"
});
import { useDialogStore } from "../../stores/usefull/dialog";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useMenuStore } from "../../stores/data/menu";
import { ElMessage } from "element-plus";
import { useTimeStore } from "../../stores/data/time";
import { useFoodStore } from "../../stores/data/food";
import { convertDate } from "../../func/date";

const timeStore = useTimeStore();
const { times } = storeToRefs(timeStore);

const foodStore = useFoodStore();
const { foods } = storeToRefs(foodStore);

const store = useMenuStore();
const { new_menu, save_menu, get_menu } = store;

const menu = ref({});
const date = ref("");
const rules = ref({
  title: [
    {
      required: true,
      message: "Ovqatlanish vaqtining nomini kiriting",
      trigger: "blur",
    },
  ],
});
const menuForm = ref();

const dialogStore = useDialogStore();
const { toggle, editToggle } = storeToRefs(dialogStore);
const { setToggle, setEditToggle } = dialogStore;

// const add = async (formEl) => {
//   if (!formEl) return;
//   await formEl.validate((valid) => {
//     if (valid) {
//       if (editToggle.value) {
//         save_menu(arr);
//       } else {
//         let arr = [];
//         menu.value.forEach((el) => {
//           el.foods.forEach((food) => {
//             if (food._id) {
//               arr.push({
//                 data: date.value,
//                 food: food._id,
//                 time: el.time,
//               });
//             }
//           });
//         });
//         if(editToggle.value){
//           save_menu(arr);
//         }else{
//           new_menu(arr)
//         }
//         menu.value = {};
//         handleClose();
//       }
//     } else {
//       ElMessage.error("Barcha maydonlarni to'ldiring");
//     }
//   });
// };

const add = async (formEl) => {
  if(!formEl) return
  await formEl.validate((valid) => {
    if(valid){
      let arr = []
      menu.value.forEach(el => {
        el.foods.forEach(food => {
          if(food._id){
            arr.push({
              ...food,
              id: food.id,
              data: date.value,
              food: food._id,
              time: el.time
            })
          }
        })
      })
      if(editToggle.value){
        save_menu(arr)
      }else{
        new_menu(arr)
      }
      menu.value = {}
      handleClose()
    }else{
      ElMessage.error("Barcha qatorlarni to'ldiring!")
    }
  })
}

const get_food = (_id, time_index, food_index) => {
  if (
    menu.value[time_index].foods.length > 1 &&
    menu.value[time_index].foods.findIndex(
      (food, f_index) => food._id == _id && f_index !== food_index
    ) !== -1
  ) {
    menu.value[time_index].foods[food_index] = {
      _id: "",
      nettos: 0,
      products: [],
    };
    ElMessage({
      type: "warning",
      message: "Siz tanlagan taom menyuda mavjud!",
    });
    return false;
  }

  let food = foods.value.find((food) => food._id == _id);
  menu.value[time_index].foods[food_index].nettos = 0;
  menu.value[time_index].foods[food_index].products = [];
  food.products.forEach((product) => {
    menu.value[time_index].foods[food_index].nettos += product.netto;
    menu.value[time_index].foods[food_index].products.push(product.id.title);
  });
  if (menu.value[time_index].foods.at(-1)._id) {
    menu.value[time_index].foods.push({
      _id: "",
      nettos: 0,
      products: [],
    });
  }
};

const set_menu_by_time = () => {
  menu.value = [
    ...times.value.map((time) => {
      return {
        time: time._id,
        time_title: time.title,
        foods: [
          {
            _id: "",
            nettos: 0,
            products: [],
          },
        ],
      };
    }),
  ];
};

const handleClose = () => {
  setToggle(false);
  setEditToggle(false);
};

watch(editToggle, async () => {
  if (editToggle.value) {
    await get_menu(props.date).then((res) => {
      if (res.data.length > 0) {
        // menu.value = { ...res.data };
        menu.value = [
          ...times.value.map((time) => {
            let list = [];
            res.data.forEach((food) => {
              if (food.time == time._id) {
                let f = foods.value.find((item) => item._id == food.food._id);
                let nettos = 0;
                let products = [];
                f.products.forEach((product) => {
                  nettos += product.netto;
                  products.push(product.id.title);
                });

                list.push({
                  ...food,
                  id: food._id,
                  _id: food.food._id,
                  nettos,
                  products,
                });
              }
            });
            list.push({
              _id: '',
              nettos: 0,
              products: []
            })
            return {
              time: time._id,
              time_title: time.title,
              foods: list,
            };
          }),
        ];
      } else {
        set_menu_by_time();
        setEditToggle(false);
      }
      let d = new Date(props.date)

      date.value = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    });
  }
});

watch(times, () => {
  if (times.value) {
    set_menu_by_time();
  }
});
</script>

<style lang="scss"></style>
