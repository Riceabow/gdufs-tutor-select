// src/router/index.js
import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";
import Admin from "../views/Admin.vue";
import Manage from "../views/Admin/Manage.vue";
import Settings from "../views/Admin/Settings.vue";
import Student from "../views/Student.vue";
import resume from "../views/Student/resume.vue";
import firstSelect from "../views/Student/firstSelect.vue";
import secondSelect from "../views/Student/secondSelect.vue";
import resultCheck from "../views/Student/resultCheck.vue";
import Teacher from "../views/Teacher.vue";
import FirstRound from "../views/Teacher/FirstRound.vue";
import SecondRound from "../views/Teacher/SecondRound.vue";
import Result from "../views/Teacher/Result.vue";
import { useUserStore } from "../store/user";
import adminResult from '../views/Admin/AdminResult.vue'
import Info from "../views/Teacher/info.vue";
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    redirect: "/admin/manage",
    meta: { requiresAuth: true, roles: ["admin"] }, // 这个路由需要认证
    children: [
      {
        path: "manage",
        component: Manage,
      },
      {
        path: "settings",
        component: Settings,
      },
      {
        path: "result",
        component: adminResult,
      },
    ],
  },
  {
    path: "/student",
    name: "Student",
    component: Student,
    redirect: "/student/info",
    meta: { requiresAuth: true, roles: ["student"] }, // 这个路由需要认证
    children: [
      {
        path: "info",
        component: resume,
      },
      {
        path: "firstSelect",
        component: firstSelect,
      },
      {
        path: "secondSelect",
        component: secondSelect,
      },
      {
        path: "result",
        component: resultCheck,
      },
    ],
  },
  {
    path: "/teacher",
    name: "Teacher",
    component: Teacher,
    redirect: "/teacher/info",
    meta: { requiresAuth: true, roles: ["teacher"] }, // 这个路由需要认证
    children: [
      {
        path: "info",
        component: Info,
      },
      {
        path: "firstRound",
        component: FirstRound,
      },
      {
        path: "secondRound",
        component: SecondRound,
      },
      {
        path: "result",
        component: Result,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.requestHeader.value) {
    console.log("未登录或者登录已经过期");
    next("/login");
  } else if (
    to.meta.roles &&
    to.meta.roles.length &&
    !to.meta.roles.includes(userStore.userRole)
  ) {
    // 如果没有权限，重定向到某个页面，例如403禁止页面
    console.log("无权限访问此页面");
    next("/403");
  } else {
    console.log(userStore.userRole);
    next();
  }
});

export default router;
