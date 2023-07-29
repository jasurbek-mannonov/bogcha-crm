import axios from "axios";
import { defineStore, storeToRefs } from "pinia";
import { useHelperStore } from ".";
import { useTokenStore } from "../user/token";
import { ElMessage } from "element-plus";
import router from "../../router";

export const useApiStore = defineStore('api', ()=> {

    const helperStore = useHelperStore()
    const {url} = helperStore

    const tokenStore = useTokenStore()
    const {token, header} = storeToRefs(tokenStore)

    const getAxios = (payload) => {
        return axios.get(`${url}/${payload.url}`, {
           ...header.value,
        }).catch(e => {
            if(e.response.status == 401){
                ElMessage({
                    type: 'error',
                    message: 'Sizda tizimga kirish vakolati mavjud emas!'
                })
                router.push({name: 'login'})
                return false
            }
            ElMessage({
                type: 'error',
                message: e.response.data?.messsage
            })
        })
    }

    const postAxios = (payload) => {
        return axios.post(`${url}/${payload.url}`,payload.data,{
            ...header.value,
        }).catch(e => {
            ElMessage({
                type: 'error',
                message: e.response.data?.messsage
            })
        })
    }

    const putAxios = (payload) => {
        return axios.put(`${url}/${payload.url}`, payload.data, {
           ...header.value,
        }).catch(e => {
            ElMessage({
                type: 'error',
                message: e.response.data?.messsage
            })
        })
    }
    const deleteAxios = (payload) => {
        return axios.delete(`${url}/${payload.url}`, {
            ...header.value,
         }).catch(e => {
             ElMessage({
                 type: 'error',
                 message: e.response.data?.messsage
             })
         })
    }

    return {
        getAxios,
        postAxios,
        putAxios,
        deleteAxios
    }
})