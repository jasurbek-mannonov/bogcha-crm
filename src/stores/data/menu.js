import {defineStore} from 'pinia'
import { ref } from 'vue'
import { useApiStore } from '../helpers/api'
import { ElMessage } from 'element-plus'
import { convertDate } from '../../func/date'

export const useMenuStore = defineStore('menu', () => {
    const menus = ref([])
    const api = useApiStore()
    const menusCount = ref(0)

    //barcha ovqatlarni olib beradi
    const get_all_menus = async() => {
        let res = await api.getAxios({
            url: 'menu'
        })
        if(res.status == 200){
            menus.value = [...res.data.menus.map(menu => {
                menu.data = convertDate(menu.data, 1)
                return menu
            })]
            menusCount.value = res.data.count
        }
    }

    //yangi ovqat
    const new_menu = async(data) => {
        await api.postAxios({
            url: 'menu',
            data
        }).then(res => {
            menus.value = [res.data, ...menus.value]
            menusCount.value += 1
            ElMessage({
                type: 'success',
                message: 'Yangi menu qo\'shildi'
            })
        })
    }

    //bitta ovqatni olish
    const get_menu = async (_date) => {
        return await api.getAxios({
            url: `menu/${_date}`
        })
    }

    //Ovqatni yangilash
    const save_menu = async(data) => {
        await api.putAxios({
            url: 'menu',
            data
        }).then(res => {
            menus.value = menus.value.map(menu => {
                if(menu._id === res.data._id) return res.data
                return menu
            })
            ElMessage({
                type: 'success',
                message: 'Menu yangilandi!'
            })
        })
    }

    //Ovqatni o'chirish
    const delete_menu = async (_id) => {
        await api.deleteAxios({
            url: `menu/${_id}`
        })
        .then(() => {
            menus.value = menus.value.filter(menu => {
                if(menu._id == _id) return false
                return menu
            })
            menusCount.value -= 1
            ElMessage({
                type: 'success',
                message: "Menu o'chirildi!"
            })
        })
    }

    //Ovqat holatini o'zgartirish (faol & nofaol)
    const status_menu = async (_id) => {
        await api.getAxios({
            url: `menu/change/${_id}`
        })
        .then(() => {
            menus.value = menus.value.map(menu => {

                if(menu._id == _id) return {
                    ...menu,
                    status: menu.status == 0 ? 1 : 0
                }

                return menu
            })
            ElMessage({
                type: 'success',
                message: 'Menu holati yangilandi!'
            })
        })
    }

    const excel_menu = async (_id) => {
        return await api.getAxios({url:'menu/excel'})
    }

    return{
        menus,
        menusCount,
        get_all_menus,
        get_menu,
        save_menu,
        status_menu,
        delete_menu,
        new_menu,
        excel_menu
    }

})