import { createRouter, createWebHistory } from 'vue-router';
import Basic from "@/pages/Basic/index.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Baisc",
      component: Basic
    }
  ]
})

export default router
