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
    meta: {
      label: "Home",
      isMenu: true,
      menuIcon: "mdi-view-dashboard",
    },    
  },
  {
    path: "/memo",
    name: "memoHome",
    component: memoHome,
    meta: {
      label: "Memo",
      isMenu: true,
      menuIcon: "mdi-note-text-outline",
    },    
  },
  {
    path: "/calendar",
    name: "calendarHome",
    component: calendarHome,
    meta: {
      label: "Calendar",
      isMenu: true,
      menuIcon: "mdi-calendar-blank",
    },    
  },
  {
    path: "/tool3",
    name: "tool3",
    meta: {
      label: "Tool 3",
      isMenu: true,
      menuIcon: "mdi-tools",
    },    
  },
  {
    path: "/tool4",
    name: "tool4",
    meta: {
      label: "Tool 4",
      isMenu: true,
      menuIcon: "mdi-tools",
    },    
  },
  {
    path: "/login",
    name: "login",
    component: login,
    isMenu: false,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;