<template>
  <div>
    <headpage :title="title" />

    <menu-table @edit="edit" />

    <menu-dialog :title="title" :date="date" />
  </div>
</template>

<script setup>
import headpage from "../../components/usefull/headpage.vue";
import menuTable from "../../components/table/menu-table.vue";
import menuDialog from "../../components/dialog/menu-dialog.vue";
import { ref, onMounted } from "vue";
import { useMenuStore } from "../../stores/data/menu";
import { useTimeStore } from "../../stores/data/time";
import { useFoodStore } from "../../stores/data/food";

const store = useMenuStore();
const timeStore = useTimeStore();
const foodStore = useFoodStore()

const title = ref("Menyu");
const date = ref("");

const edit = (val) => {
  date.value = val;
};

onMounted(() => {
  store.get_all_menus();
  timeStore.get_all_times();
  foodStore.get_all_foods()
});
</script>

<style lang="scss"></style>
