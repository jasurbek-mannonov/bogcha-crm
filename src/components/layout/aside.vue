<template>
    <aside>
        <el-menu
        class="el-menu-vertical-demo"
        :router="true"
      >
        <el-menu-item 
        v-for="(item, index) of menuLink"
        :key="index"
        :index="item.path"
        >
          <el-icon><component :is="item.icon"/></el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </aside>
</template>

<script setup>
    import { ref } from 'vue';
    import {menuLink} from '../../router/menu'

</script>

<style lang="scss">   
@import '@/styles/vars/colors.scss';
    aside{
        width: 200px;
        height: 100%;
        background-color: #fff;
        padding: 15px;
        .el-menu{
            border-right: unset;
        }
    }
</style>