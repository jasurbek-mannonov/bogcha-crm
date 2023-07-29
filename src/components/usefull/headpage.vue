<template>
    <div class="headpage">
        <h1>{{ title }}lar</h1>
        <el-button type="primary"
        @click="setToggle(true)"
        >
            <el-icon>
                <plus/>
            </el-icon>
            Yangi {{ title.toLowerCase() }}
        </el-button>
    </div>
</template>

<script setup>
import { useDialogStore } from '../../stores/usefull/dialog';

const dialogStore = useDialogStore()
const {setToggle} = dialogStore
defineProps({
    title: {
        type: String
    }
})
</script>

<style lang="scss">
    .headpage{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }
</style>