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
      ref="timeForm"
      :rules="rules"
      :model="time"
      label-position="top"
      @submit.prevent="add(timeForm)"
    >
      <el-form-item label="Ovqatlanish vaqti nomi" prop="title">
        <el-input v-model="time.title" />
      </el-form-item>
      <el-form-item label="Tartib raqami" prop="order">
        <el-input
              class="el-full text-left"
              v-maska
              data-maska="########"
              v-model="time.order"
            />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer" @click="handleClose">
        <el-button> Bekor qilish </el-button>
        <el-button type="primary" @click="add(timeForm)"> Saqlash </el-button>
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
  // "title",
  //  'id'
});
import { useDialogStore } from "../../stores/usefull/dialog";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useTimeStore } from "../../stores/data/time";
import { ElMessage } from "element-plus";

const store = useTimeStore();
const { new_time, save_time, get_time } = store;

const time = ref({});
const rules = ref({
  title: [
    {
      required: true,
      message: "Ovqatlanish vaqtining nomini kiriting",
      trigger: "blur",
    },
  ],
  order: [
    {
      required: true,
      message: "Ovqatlanish vaqtining tartib raqamini kiriting",
      trigger: "blur",
    },
  ],
});
const timeForm = ref();

const dialogStore = useDialogStore();
const { toggle, editToggle } = storeToRefs(dialogStore);
const { setToggle, setEditToggle } = dialogStore;

const add = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      if (editToggle.value) {
        save_time(time.value);
      } else {
        new_time(time.value);
      }
      time.value = {};
      handleClose();
    } else {
      ElMessage.error("Barcha maydonlarni to'ldiring");
    }
  });
};

const handleClose = () => {
  setToggle(false);
  setEditToggle(false);
};

watch(editToggle, async () => {
  if (editToggle.value) {
    await get_time(props.id).then((res) => {
      time.value = { ...res.data }
    })
  }
})
</script>

<style lang="scss"></style>
