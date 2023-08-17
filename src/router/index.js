import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/user/auth";

import { menuLink } from "./menu";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/layout/main.vue"),
      children: menuLink,
    },
    {
      path: "/",
      component: () => import("@/layout/auth.vue"),
      children: [
        {
          path: "/reg",
          name: "reg",
          component: () => import("@/views/auth/reg.vue"),
        },
        {
          path: "/login",
          name: "login",
          component: () => import("@/views/auth/login.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (["login", "reg"].includes(to.name)) next();
  else {
    const authStore = useAuthStore();
    authStore.checkUser();
    next();
  }
});

export default router;
