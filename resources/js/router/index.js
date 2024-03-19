import { createRouter, createWebHistory } from "vue-router";
import About from "../components/About.vue";
import NotFound from "../components/NotFound.vue";
import Home from "../components/Home.vue";
import Register from "../components/Auth/Register.vue";
import Login from "../components/Auth/Login.vue";
import Dashboard from "../components/Dashboard.vue";
const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
