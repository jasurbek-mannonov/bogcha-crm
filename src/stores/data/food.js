import {defineStore} from 'pinia'
import { ref } from 'vue'

import { useApiStore } from '../helpers/api'
import { ElMessage } from 'element-plus'

import {usePriceprodStore} from './priceprod'

export const useFoodStore = defineStore('food', () => {
    const foods = ref([])
    const api = useApiStore()
    const foodsCount = ref(0)

    const priceprod = usePriceprodStore()

    //barcha ovqatlarni olib beradi
    const get_all_foods = async() => {
        let res = await api.getAxios({
            url: 'food'
        })
        if(res.status == 200){
            foods.value = [...res.data.foods.map(food => {
                food.products = food.products.map(product => {
                    product.unit = priceprod.units[product.id.unit] || product.id.unit 
                    return product
                })
                return food
            })]
            foodsCount.value = res.data.count
        }
    }

    //yangi ovqat
    const new_food = async(data) => {
        await api.postAxios({
            url: 'food',
            data
        }).then(res => {
            foods.value = [res.data, ...foods.value]
            foodsCount.value += 1
            ElMessage({
                type: 'success',
                message: 'Yangi ovqat qo\'shildi'
            })
        })
    }

    //bitta ovqatni olish
    const get_food = async (_id) => {
        return await api.getAxios({
            url: `food/${_id}`
        })
    }

    //Ovqatni yangilash
    const save_food = async(data) => {
        await api.putAxios({
            url: 'food',
            data
        }).then(res => {
            foods.value = foods.value.map(food => {
                if(food._id === res.data._id) return res.data
                return food
            })
            ElMessage({
                type: 'success',
                message: 'Ovqat yangilandi!'
            })
        })
    }

    //Ovqatni o'chirish
    const delete_food = async (_id) => {
        await api.deleteAxios({
            url: `food/${_id}`
        })
        .then(() => {
            foods.value = foods.value.filter(food => {
                if(food._id == _id) return false
                return food
            })
            foodsCount.value -= 1
            ElMessage({
                type: 'success',
                message: "Ovqat o'chirildi!"
            })
        })
    }

    //Ovqat holatini o'zgartirish (faol & nofaol)
    const status_food = async (_id) => {
        await api.getAxios({
            url: `food/change/${_id}`
        })
        .then(() => {
            foods.value = foods.value.map(food => {

                if(food._id == _id) return {
                    ...food,
                    status: food.status == 0 ? 1 : 0
                }

                return food
            })
            ElMessage({
                type: 'success',
                message: 'Ovqat holati yangilandi!'
            })
        })
    }

    const excel_food = async (_id) => {
        return await api.getAxios({url:'food/excel'})
    }

    return{
        foods,
        foodsCount,
        get_all_foods,
        get_food,
        save_food,
        status_food,
        delete_food,
        new_food,
        excel_food
    }

})