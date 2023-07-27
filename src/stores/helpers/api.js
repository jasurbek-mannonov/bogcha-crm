import axios from "axios";
import { defineStore } from "pinia";
import { useHelperStore } from ".";
import { useTokenStore } from "../user/token";
import { ElMessage } from "element-plus";
import router from "../../router";

export const useApiStore = defineStore('api', ()=> {

    const helperStore = useHelperStore()
    const {url} = helperStore

    const tokenStore = useTokenStore()
    const {token, header} = tokenStore

    const getAxios = (payload) => {
        return axios.get(`${url}/${payload.url}`, {
           ...header,
        }).catch(e => {
            ElMessage({
                type: 'error',
                message: e.response.data?.messsage
            })
            if(e.response.status == 401){
                router.push({name: 'login'})
            }
        })
    }
    const postAxios = (payload) => {
        return axios.post(`${url}/${payload.url}`,payload.data,{
           ...header,
        }).catch(e => {
            ElMessage({
                type: 'error',
                message: e.response.data?.messsage
            })
        })
    }
    const putAxios = (payload) => {
        return axios.put(`${url}/${payload.url}`, payload.data, {
           ...header,
        }).catch(e => {
            ElMessage({
                type: 'error',
                message: e.response.data?.messsage
            })
        })
    }
    const deleteAxios = () => {
        return axios.delete(`${url}/${payload.url}`, {
            ...header,
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