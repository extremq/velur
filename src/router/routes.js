const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/PageHome.vue"),
        name: "Home",
      },
      {
        path: "/about",
        component: () => import("src/pages/PageAbout.vue"),
        name: "About Velur",
      },
      {
        path: "/login",
        component: () => import("src/pages/PageLogin.vue"),
        name: "Login",
      },
      {
        path: "/register",
        component: () => import("src/pages/PageRegister.vue"),
        name: "Register",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
