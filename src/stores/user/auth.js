import { defineStore } from "pinia";
import { ref } from "vue";
import cookies from 'vue-cookies'
import router from '../../router'
import { useApiStore } from "../helpers/api";
import { ElMessage } from "element-plus";
import { useTokenStore } from "./token";

export const useAuthStore = defineStore('auth', () => {
    const user = ref({}) 
    const apiStore = useApiStore()

    const tokenStore = useTokenStore()

    const setUser = (payload) => {
        cookies.set('bogcha-user', payload)
        user.value = payload
    }

    const registration = async (payload) => {
        let res = await apiStore.postAxios({
            url: 'auth/reg',
            data: payload
        })
        if(res.status == 201){
           ElMessage({
            type: 'success',
            message: 'Muvaffaqiyatli ro\'yxatdan o\'tdingiz. Tizimga login va parol orqali kiring'
           })
           router.push({name: 'login'})
        //    router.push('/login')
        }
    }

    const login = async (payload) => {
        let res = await apiStore.postAxios({
            url: 'auth/login',
            data: payload
        })
        if(res.status == 200){
            setUser(res.data.user)
            tokenStore.setToken(res.data.token)
            router.push({name: 'dashboard'})
        }
    }

    return {
        login,
        registration,
        user
     }
})