<template>
  <el-dialog
    v-model="toggle"
    :title="
      editToggle ? `${title}ni tahrirlash` : `Yangi ${title.toLowerCase()}`
    "
    width="30%"
    :before-close="handleClose"
  >
    <el-form
      ref="foodForm"
      :rules="rules"
      :model="food"
      label-position="top"
      @submit.prevent="add(foodForm)"
    >
      <el-form-item label="Ovqat nomi" prop="title">
        <el-input v-model="food.title" placeholder="Ovqat nomini kiriting" />
      </el-form-item>

      <el-row :gutter="30" v-for="(item, index) of food.products" :key="index">
        <el-col :span="12">
          <el-form-item :label="index === 0 ? 'Mahsulotni tanlang' : ''">
            <el-select
              filterable
              v-model="item.id"
              @change="set_append(item.id, index)"
              placeholder="Ro'yxatdan tanlang"
              class="el-full"
            >
              <el-option
                v-for="item in priceprods"
                :key="item._id"
                :label="item.product.title"
                :value="item.product._id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="index == 0 ? 'Mahsulotni og\'irligi' : ''">
            <el-input
              class="el-full text-left"
              v-maska
              data-maska="########"
              @input="calc"
              v-model="item.netto"
            >
              <template #append>
                <div>
                  {{ item.append }}
                </div>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <h3 v-if="food.price">Umumiy narx: {{ food.price?.toLocaleString() }} so'm</h3>
      <!-- <el-form-item label="Mahsulot" prop="product">
        <el-select
          clearable
          filterable
          v-model="food.product"
          placeholder="Ro'yxatdan tanlang"
          class="el-full"
        >
          <el-option
            v-for="item in products"
            :key="item._id"
            :label="item.title"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
  
        <el-form-item label="Mahsulot narxi" prop="price">
          <el-input-number 
          class="el-full text-left" 
          :controls="false" 
          v-model="food.price"
          />
        </el-form-item> -->
    </el-form>

    <template #footer>
      <span class="dialog-footer" @click="handleClose">
        <el-button> Bekor qilish </el-button>
        <el-button type="primary" @click="add(foodForm)" :disabled="!food.price || food.price < 0"> Saqlash </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  id: {
    type: [Number, String],
  },
});
import { useDialogStore } from "../../stores/usefull/dialog";
import { storeToRefs } from "pinia";
import { ref, watch, computed } from "vue";
import { useFoodStore } from "../../stores/data/food";
import { useHelperStore } from "../../stores/helpers/index";
import { ElMessage } from "element-plus";
import { usePriceprodStore } from "../../stores/data/priceprod";

const helperStore = useHelperStore();
const { url } = helperStore;

const priceStore = usePriceprodStore();
const { priceprods } = storeToRefs(priceStore);

const store = useFoodStore();
const { new_food, save_food, get_food } = store;

const food = ref({
  products: [
    {
      id: "",
      netto: 0,
    },
  ],
});
const rules = ref({
  Title: [
    {
      required: true,
      message: "Ovqat nomini kiriting",
      trigger: "blur",
    },
  ]
});
const foodForm = ref();

const dialogStore = useDialogStore();
const { toggle, editToggle } = storeToRefs(dialogStore);
const { setToggle, setEditToggle } = dialogStore;

const add = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {

     productsFilter()

      if (editToggle.value) {
        save_food(food.value);
      } else {
        new_food(food.value);
      }
      food.value = {};
      handleClose();
    } else {
      ElMessage.error("Barcha maydonlarni to'ldiring");
    }
  });
};

const set_append = (_id, index) => {
  let item = priceprods.value.find((item) => item.product._id == _id);
  food.value.products[index].append = item.product.miniunit;
  food.value.products[index].price =
    item.product.miniunit == item.product.unit ? item.price : item.price / 1000;
};

const get_append = () => {
  food.value.products = food.value.products.map((item, index) => {

  let t = priceprods.value.find(item => item.product._id == item.id);
  item.append = t.product.miniunit;
  item.price = t.product.miniunit == t.product.unit ? t.price : t.price / 1000;

    return item
  })
}

const productsFilter = () => {
  food.value.products = food.value.products.filter((item )=>{
        if(item.id && item.netto > 0) return item

        return false
      } )
}

const calc = () => {
 productsFilter()

  food.value.price = 0
  food.value.products.forEach(item => {
    food.value.price += item.price * item.netto
  })

  if(food.value.products.at(-1).id && food.value.products.at(-1).netto > 0){
    food.value.products.push({
      id: '',
      netto: ''
    })
  }
}

const handleClose = () => {
  setToggle(false);
  setEditToggle(false);
};

watch(editToggle, async () => {
  if (editToggle.value) {
    await get_food(props.id).then((res) => {
      food.value = { ...res.data };
      calc()
      get_append()
    });
  }
});
</script>

<style lang="scss"></style>
