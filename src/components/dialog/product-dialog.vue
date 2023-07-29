<template>
  <el-dialog
    v-model="toggle"
    :title="`Yangi ${title.toLowerCase()} qo'shish`"
    width="30%"
    :before-close="handleClose"
  >
    <el-form
      ref="productForm"
      :rules="rules"
      :model="product"
      label-position="top"
      @submit.prevent="add(productForm)"
    >
      <el-form-item label="Mahsulot nomi" prop="title">
        <el-input v-model="product.title" />
      </el-form-item>

      <el-form-item label="Mahsulot birligi" prop="unit">
        <el-select
          clearable
          filterable
          v-model="product.unit"
          placeholder="Ro'yxatdan tanlang"
        >
          <el-option
            v-for="(item, index) in units"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>

        <el-form-item label="Mahsulot rasmi" prop="img">
          <el-upload
            v-model:file-list="product.img"
            :action="`${url}/image/product`"
            list-type="picture-card"
            :limit="1"
            :before-upload="handleBefore"
            :on-preview="handlePreview"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer" @click="handleClose">
        <el-button> Bekor qilish </el-button>
        <el-button type="primary" @click="add(productForm)">
          Saqlash
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
defineProps({
  title: {
    type: String,
  },
});
import { useDialogStore } from "../../stores/usefull/dialog";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useProductStore } from "../../stores/data/product";
import { useHelperStore } from "../../stores/helpers/index";
import { ElMessage } from "element-plus";

const helperStore = useHelperStore();
const { url } = helperStore;
const store = useProductStore();

const { products, productsCount, units } = storeToRefs(store);
const { new_product } = store;

const product = ref({});
const rules = ref({
  title: [
    {
      required: true,
      message: "Mahsulot nomini kiriting",
      trigger: "blur",
    },
  ],
  unit: [
    {
      required: true,
      message: "Mahsulot birligni tanlang",
      trigger: "change",
    },
  ],
  img: [
    {
      required: true,
      message: "Mahsulot rasmini yuklang",
      trigger: "blur",
    },
  ],
});
const productForm = ref();

const dialogStore = useDialogStore();
const { toggle } = storeToRefs(dialogStore);
const { setToggle } = dialogStore;

const add = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      new_product(product.value);
      product.value = {}
      setToggle(false);
    } else {
      ElMessage.error("Barcha maydonlarni to'ldiring");
    }
  });
};

const handleBefore = (file) => {
  if (file.size / 1024 > 500) {
    ElMessage.warning("Fayl hajmi 500kb dan oshmasligi kerak");
    return false;
  }
};

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const handlePreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};

const handleClose = () => {
  setToggle(false);
};
</script>

<style lang="scss"></style>
