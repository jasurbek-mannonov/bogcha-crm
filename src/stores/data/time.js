import {defineStore} from 'pinia'
import { ref } from 'vue'

import { useApiStore } from '../helpers/api'
import { ElMessage } from 'element-plus'

import {usePriceprodStore} from './priceprod'

export const useTimeStore = defineStore('time', () => {
    const times = ref([])
    const api = useApiStore()
    const timesCount = ref(0)

    const priceprod = usePriceprodStore()

    //barcha ovqatlarni olib beradi
    const get_all_times = async() => {
        let res = await api.getAxios({
            url: 'time'
        })
        if(res.status == 200){
            times.value = [...res.data.times]
            timesCount.value = res.data.count
        }
    }

    //yangi ovqat
    const new_time = async(data) => {
        await api.postAxios({
            url: 'time',
            data
        }).then(res => {
            times.value = [res.data, ...times.value]
            timesCount.value += 1
            ElMessage({
                type: 'success',
                message: 'Ovqatlanish vaqti qo\'shildi'
            })
        })
    }

    //bitta ovqatni olish
    const get_time = async (_id) => {
        return await api.getAxios({
            url: `time/${_id}`
        })
    }

    //Ovqatni yangilash
    const save_time = async(data) => {
        await api.putAxios({
            url: 'time',
            data
        }).then(res => {
            times.value = times.value.map(time => {
                if(time._id === res.data._id) return res.data
                return time
            })
            ElMessage({
                type: 'success',
                message: 'Ovqatlanish vaqti yangilandi!'
            })
        })
    }

    //Ovqatni o'chirish
    const delete_time = async (_id) => {
        await api.deleteAxios({
            url: `time/${_id}`
        })
        .then(() => {
            times.value = times.value.filter(time => {
                if(time._id == _id) return false
                return time
            })
            timesCount.value -= 1
            ElMessage({
                type: 'success',
                message: "Ovqatlanish vaqti o'chirildi!"
            })
        })
    }

    //Ovqat holatini o'zgartirish (faol & nofaol)
    const status_time = async (_id) => {
        await api.getAxios({
            url: `time/change/${_id}`
        })
        .then(() => {
            times.value = times.value.map(time => {

                if(time._id == _id) return {
                    ...time,
                    status: time.status == 0 ? 1 : 0
                }

                return time
            })
            ElMessage({
                type: 'success',
                message: 'Ovqatlanish vaqtining holati yangilandi!'
            })
        })
    }

    const excel_time = async (_id) => {
        return await api.getAxios({url:'time/excel'})
    }

    return{
        times,
        timesCount,
        get_all_times,
        get_time,
        save_time,
        status_time,
        delete_time,
        new_time,
        excel_time
    }

})