<template>
<div>
    <headpage :title="title"/>

    <product-table/>

    <product-dialog :title="title"/>
</div>
</template>

<script setup>
import headpage from "../../components/usefull/headpage.vue";
import productTable from "../../components/table/product-table.vue";
import productDialog from "../../components/dialog/product-dialog.vue";
import { ref, onMounted } from "vue";
import {useProductStore} from "../../stores/data/product"

const store = useProductStore()

const title = ref('Mahsulot')

onMounted(() => {
    store.get_all_products()
})

</script>

<style lang="scss">
</style>
