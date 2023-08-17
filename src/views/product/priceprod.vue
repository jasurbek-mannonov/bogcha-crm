<template>
    <div>
        <headpage :title="title" :excel="true" @excel="downloadExcel"/>
    
        <priceprod-table @edit="edit"/>
    
        <priceprod-dialog 
        :title="title"
        :id="id"
        />
    </div>
    </template>
    
    <script setup>
    import headpage from "../../components/usefull/headpage.vue";
    import priceprodTable from "../../components/table/priceprod-table.vue";
    import priceprodDialog from "../../components/dialog/priceprod-dialog.vue";
    import { ref, onMounted } from "vue";
    import {usePriceprodStore} from "../../stores/data/priceprod"
    import { useProductStore } from "../../stores/data/product";
    import { useHelperStore } from "../../stores/helpers";
    import { useApiStore } from "../../stores/helpers/api";

    const productStore = useProductStore()
    const {get_all_active_products} = productStore
    const store = usePriceprodStore()
    const helpers = useHelperStore()
    const api = useApiStore()
    const title = ref('Narx')
    const id = ref('')
    
    const edit = (val) => {
        id.value = val
    }

    const downloadExcel = async() => {
        let res = await store.excel_priceprod()
        if(res.status == 200){
          api.downloadFile(res.data)
        }
    }

    onMounted(() => {
        store.get_all_priceprods()
        get_all_active_products()
    })
    
    </script>
    
    <style lang="scss">
    </style>
    