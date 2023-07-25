import { defineStore } from "pinia";
import { ref } from "vue";
import cookies from 'vue-cookies'


export const useTokenStore = defineStore('token', () => {

    const token = ref('')
    const header = ref({})

    const setToken = (payload) => {
        cookies.set('bogcha-token', payload)
        token.value = payload
        header.value = {
            headers: {
                'authorization': `Bearor ${payload}`
            }
        }
    }

    return{
        token,
        setToken,
        header
    }
})