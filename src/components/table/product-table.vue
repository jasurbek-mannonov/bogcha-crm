<template>
  <el-table :data="products">
    <el-table-column prop="title" label="Mahsulot nomi" />
    <el-table-column prop="unit" label="Birligi" />
    <el-table-column prop="status" label="Holati">
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
import { storeToRefs } from "pinia";
import { useProductStore } from "../../stores/data/product";

const store = useProductStore();

const { products } = storeToRefs(store);
const { status_product, delete_product } = store;

const changeStatus = (_id) => {
  status_product(_id);
}

const remove = (_id) => {
    if(confirm("Qaroringiz qat'iymi?")){
        delete_product(_id)
     }
}
</script>

<style lang="scss"></style>
