import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/signup",
    name: "Signup-Emp",
    component: () => import("../components/signup.vue"),
  },
  {
    path: "/test",
    name: "Signup-Emp",
    component: () => import("../views/test.vue"),
  },
 
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../components/About.vue"),
  },

  {
    path: "/Home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [ 
      {
        path: "table",
        name: "table",
        component: () => import("../components/table.vue"),
      },
      {
        path: "edittable",
        name: "edittable",
        component: () => import("../components/edittable.vue"),
      },
    ],
  },
];
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("../components/Error404.vue"),
  });
}

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
