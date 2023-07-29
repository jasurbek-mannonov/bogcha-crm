import {defineStore} from 'pinia'
import { ref } from 'vue'

import { useApiStore } from '../helpers/api'
import { ElMessage } from 'element-plus'

export const useProductStore = defineStore('product', () => {
    const products = ref([])
    const api = useApiStore()
    const productsCount = ref(0)
    const units = ref(['kg', 'l', 'dona', 'gr', 'ml'])

    //barcha mahsulotlarni olib beradi
    const get_all_products = async() => {
        let res = await api.getAxios({
            url: 'product'
        })
        if(res.status == 200){
            products.value = [...res.data.products]
            productsCount.value = res.data.count
        }
    }

    //yangi mahsulot
    const new_product = async(data) => {
        await api.postAxios({
            url: 'product',
            data
        }).then(res => {
            products.value = [res.data, ...products.value]
            productsCount.value += 1
            ElMessage({
                type: 'success',
                message: 'Yangi mahsulot qo\'shildi'
            })
        })
    }

    //bitta mahsulotni olish
    const get_product = async (_id) => {
        return await api.getAxios({
            url: 'product/${_id}'
        })
    }

    //Mahsulotni yangilash
    const save_product = async(data) => {
        await api.putAxios({
            url: 'product',
            data
        }).then(res => {
            products.value = products.value.map(product => {
                if(product._id === res.data._id) return res.data
                return product
            })
            ElMessage({
                type: 'success',
                message: 'Mahsulot yangilandi!'
            })
        })
    }

    //Mahsulotni o'chirish
    const delete_product = async (_id) => {
        await api.deleteAxios({
            url: `product/${_id}`
        })
        .then(() => {
            products.value = products.value.filter(product => {
                if(product._id == _id) return false
                return product
            })
            productsCount.value -= 1
            ElMessage({
                type: 'success',
                message: "Mahsulot o'chirildi!"
            })
        })
    }

    //Mahsulot holatini o'zgartirish (faol & nofaol)
    const status_product = async (_id) => {
        await api.getAxios({
            url: `product/change/${_id}`
        })
        .then(() => {
            products.value = products.value.map(product => {

                if(product._id == _id) return {
                    ...product,
                    status: product.status == 0 ? 1 : 0
                }

                return product
            })
            ElMessage({
                type: 'success',
                message: 'Mahsulot holati yangilandi!'
            })
        })
    }

    return{
        products,
        productsCount,
        units,
        get_all_products,
        get_product,
        save_product,
        status_product,
        delete_product,
        new_product
    }

})