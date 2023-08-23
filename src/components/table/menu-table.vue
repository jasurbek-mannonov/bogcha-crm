<template>
    <el-calendar>
    <template #date-cell="{ data }">
      <div class="el-calendar-day" @click="editMenu(data)">
        {{ data.day.split('-').at(-1) }}
        <!-- {{ data.isSelected ? '✔️' : '' }} -->
      </div>
    </template>
  </el-calendar>
  </template>
  
  <script setup>
  
  const emit = defineEmits([
      'edit'
  ])
  
  import { useMenuStore } from "../../stores/data/menu";
  import { storeToRefs } from "pinia";
  import { useDialogStore } from "../../stores/usefull/dialog";
  const store = useMenuStore();
  

  const { menus } = storeToRefs(store);
  const { status_menu, delete_menu } = store;
  
  const dialog = useDialogStore()
  
  const editMenu = (date) => {
      emit('edit', date.date)
      //this.$emit('edit', _id)
      dialog.setToggle(true) // dialog open / close
      dialog.setEditToggle(true) // add ! save
  }

  </script>
  
  <style lang="scss">
    .el-calendar-table .el-calendar-day{
      padding: 0;
      .el-calendar-day{
        padding: 10px;
      }
    }
  </style>
  