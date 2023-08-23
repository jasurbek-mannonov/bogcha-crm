<template>
    <el-table :data="times">
      <el-table-column label="t/r" type="index"/>
      <el-table-column prop="title" label="Ovqatlanish vaqtining nomi"/>
      <el-table-column prop="order" label="Tartib raqami"/>
      <el-table-column prop="status" label="Holati" width="90" align="right">
        <template #default="scope">
          <el-popconfirm
            title="Qaroringiz qat'iymi?"
            @confirm="changeStatus(scope.row._id)"
          >
            <template #reference>
              <el-button :type="scope.row.status == 1 ? 'success' : 'danger'">
                <el-icon>
                  <check v-if="scope.row.status == 1" />
                  <close v-else />
                </el-icon>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column width="100" align="right">
       <template #default="scope">
          <el-dropdown> 
          <el-button>
              <el-icon class="el-icon--right">
                  <more />
              </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="editTime(scope.row._id)">
                <el-icon>
                  <edit />
                </el-icon>
                Tahrirlash
              </el-dropdown-item>
              <el-dropdown-item @click="remove(scope.row._id)">
                <el-icon>
                  <delete />
                </el-icon>
                O'chirish
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
       </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script setup>
  
  const emit = defineEmits([
      'edit'
  ])
  
  import { useTimeStore } from "../../stores/data/time";
  import { storeToRefs } from "pinia";
  import { useDialogStore } from "../../stores/usefull/dialog";
  const store = useTimeStore();
  

  const { times } = storeToRefs(store);
  const { status_time, delete_time } = store;
  
  const changeStatus = (_id) => {
    status_time(_id);
  }
  
  const remove = (_id) => {
      if(confirm("Qaroringiz qat'iymi?")){
          delete_time(_id)
       }
  }
  
  const dialog = useDialogStore()
  
  const editTime = (_id) => {
      emit('edit', _id)
      //this.$emit('edit', _id)
      dialog.setToggle(true) // dialog open / close
      dialog.setEditToggle(true) // add ! save
  }
  </script>
  
  <style lang="scss"></style>
  