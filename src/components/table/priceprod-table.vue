<template>
    <el-table :data="priceprods">
      <el-table-column label="t/r" type="index"></el-table-column>
      <el-table-column prop="product.title" label="Mahsulot nomi">
      </el-table-column>
      <el-table-column prop="price" label="Narxi">
        <template #default="scope">
            {{ scope.row.price.toLocaleString() || 0 }} so'm
        </template>
      </el-table-column>
      <el-table-column label="Sana" prop="data"/> 
      <el-table-column prop="status" label="Holati" width="80">
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
              <el-dropdown-item @click="editPriceprod(scope.row._id)">
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

  import { storeToRefs } from "pinia";
  
  import { usePriceprodStore } from "../../stores/data/priceprod";
  import { useDialogStore } from "../../stores/usefull/dialog";
  const store = usePriceprodStore();
  
  
  
  const { priceprods } = storeToRefs(store);
  const { status_priceprod, delete_priceprod } = store;
  
  const changeStatus = (_id) => {
    status_priceprod(_id);
  }
  
  const remove = (_id) => {
      if(confirm("Qaroringiz qat'iymi?")){
          delete_priceprod(_id)
       }
  }
  
  const dialog = useDialogStore()
  
  const editPriceprod = (_id) => {
      emit('edit', _id)
      //this.$emit('edit', _id)
      dialog.setToggle(true) // dialog open / close
      dialog.setEditToggle(true) // add ! save
  }
  </script>
  
  <style lang="scss"></style>
  