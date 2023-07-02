import { createWebHistory, createRouter } from "vue-router";

import mainHome from "@/pages/mainHome.vue";
import memoHome from "@/pages/memo/memoHome.vue";
import calendarHome from "@/pages/calendar/calendarHome.vue";
import login from "@/components/Login.vue";

const routes = [
  {
    path: "/",
    name: "mainHome",
    component: mainHome,
  },
  {
    path: "/memo",
    name: "memoHome",
    component: memoHome,
  },
  {
    path: "/calendar",
    name: "calendarHome",
    component: calendarHome,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;