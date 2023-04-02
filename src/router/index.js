import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: "/",
        name: "initial",
        component: () => import("@/views/Home"),
        children:[]
    },
    {
        path: "/favorites",
        name: "favorites",
        component: () => import("@/views/Favorites"),
        children:[]
    },
    {
        path: "/search/:title",
        name: "search",
        props: (route) => ({
            title: route.params.title,
        }),
        component: () => import("@/views/Search"),
        children:[]
    },
    {
        path: "/sigin",
        name: "sigin",
        component: () => import("@/views/Sigin"),
        children:[]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
