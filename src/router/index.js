import { createWebHistory, createRouter } from "vue-router";

import mainHome from "@/pages/mainHome.vue";
import memoHome from "@/pages/memo/memoHome.vue";
import calendarHome from "@/pages/calendar/calendarHome.vue";
import login from "@/components/Login.vue";
import join from "@/components/Join.vue";

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
  {
    path: "/join",
    name: "join",
    component: join,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;