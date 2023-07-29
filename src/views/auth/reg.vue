<template>
  <div class="reg">
    <div class="title">Ro'yxatdan o'tish</div>
    <el-form
      ref="regForm"
      :model="user"
      :rules="rules"
      label-position="top"
      @submit.prevent="regis(regForm)"
    >
      <el-form-item label="Loginni kiriting" prop="login">
        <el-input v-model="user.login" @keypress.enter="regis(regForm)" />
      </el-form-item>

      <el-form-item label="Parolni kiriting" prop="password">
        <el-input
          v-model="user.password"
          type="password"
          show-password
          @keypress.enter="regis(regForm)"
          @blur="loginCheck"
        />
      </el-form-item>
      <router-link to="/login">Ro'yxatdan o'tganmisiz?</router-link>
      <el-button 
      type="success" 
      @click="regis(regForm)"
      :disabled="status"
      >
       Kirish
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {useAuthStore} from '@/stores/user/auth'
import axios from "axios";
import { ElMessage } from "element-plus";


const user = ref({});
const regForm = ref();
const status = ref(false)

const authStore = useAuthStore()

const rules = ref({
  login: [
    {
      required: true,
      message: "Loginni kiriting",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Parolni kiriting",
      trigger: "blur",
    },
    {
      min: 3,
      max: 16,
      message: "Parol eng kamida 3 belgidan iborat bo'lsin",
      trigger: "blur",
    },
  ],
});

const loginCheck = async() => {
  let res = await authStore.checkLogin({
    login: user.value.login
  })
  if(res.status == 200){
    if(res.data == 'yes'){
      status.value = true
      ElMessage({
        type: 'warning',
        message: "Bu logindagi foydalanuvchi tizimda allaqachon mavjud! Iltimos, boshqa login kiriting"
      })
    }
    if(res.data == 'no'){
      status.value = false
    }
    console.log(res.data)
  }
}

const regis = async (regForm) => {
  console.log(regForm);
  if (!regForm) return;
  await regForm.validate((valid, fields) => {
    if (valid) {
      authStore.registration(
      {login: user.value.login, 
       password: user.value.password}
      )
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style lang="scss"></style>
