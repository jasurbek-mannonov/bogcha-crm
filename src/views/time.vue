<template>
    <div>
        <headpage :title="title"/>
    
        <time-table @edit="edit"/>
    
        <time-dialog 
        :title="title"
        :id="id"
        />
    </div>
    </template>
    
    <script setup>
    
    import headpage from "../components/usefull/headpage.vue";
    import timeTable from "../components/table/time-table.vue";
    import timeDialog from "../components/dialog/time-dialog.vue";
    import { ref, onMounted } from "vue";
    import {useTimeStore} from "../stores/data/time"
    
    const store = useTimeStore()
    
    const title = ref('Ovqatlanish vaqt')
    const id = ref('')
    
    const edit = (val) => {
        id.value = val
    }
    
    onMounted(() => {
        store.get_all_times()
    })
    
    </script>
    
    <style lang="scss">
    </style>
    