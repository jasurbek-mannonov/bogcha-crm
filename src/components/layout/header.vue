<template>
  <div class="header">
    <div class="logo">LOGO</div>
    <el-popconfirm 
        title="Tizimdan chiqmoqchimisiz?"
        @confirm="store.logout"
    >
      <template #reference>
        <el-button type="danger">
            <el-icon>
                <SwitchButton/>
            </el-icon>
            Chiqish
        </el-button>
      </template>
    </el-popconfirm>
  </div>
</template>
<script setup>
    import { useAuthStore } from '../../stores/user/auth';
    const store = useAuthStore()
</script>
<style lang="scss">
@import "@/styles/components/headers.scss";
</style>
