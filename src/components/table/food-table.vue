<template>
  <el-table :data="foods">
    <el-table-column label="t/r" type="index" />
    <el-table-column prop="title" label="Taom" />
    <el-table-column prop="price" label="Bir porsiya narxi">
      <template #default="scope">
        {{ scope.row.price.toLocaleString() || 0 }} so'm
      </template>
    </el-table-column>
    <el-table-column label="Mahsulotlar">
      <template #default="scope">
        <el-popover
          placement="top-start"
          title="Mahsulotlar ro'yxati"
          :width="250"
          trigger="hover"
          content="this is content, this is content, this is content"
        >
          <template #reference>
            <el-button class="m-2">Ro'yxat</el-button>
          </template>
          <el-table :data="scope.row.products">
            <el-table-column width="150" property="id.title" label="Mahsulot" />
            <el-table-column width="100" property="netto" label="Sarfi">
              <template #default="scope">
                <div>
                  {{ scope.row.netto }} {{ scope.row.unit }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-popover>
      </template>
    </el-table-column>
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
              <el-dropdown-item @click="editFood(scope.row._id)">
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
const emit = defineEmits(["edit"]);

import { storeToRefs } from "pinia";

import { useFoodStore } from "../../stores/data/food";
import { useDialogStore } from "../../stores/usefull/dialog";
const store = useFoodStore();

const { foods } = storeToRefs(store);
const { status_food, delete_food } = store;

const changeStatus = (_id) => {
  status_food(_id);
};

const remove = (_id) => {
  if (confirm("Qaroringiz qat'iymi?")) {
    delete_food(_id);
  }
};

const dialog = useDialogStore();

const editFood = (_id) => {
  emit("edit", _id);
  //this.$emit('edit', _id)
  dialog.setToggle(true); // dialog open / close
  dialog.setEditToggle(true); // add ! save
};
</script>

<style lang="scss"></style>
