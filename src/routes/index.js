import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("@/components/board/List.vue"),
    },
    {
        path: "/view/:id",
        component: () => import("@/components/board/View.vue"),
    },
    {
        path: "/write",
        component: () => import("@/components/board/Write.vue"),
    },
    {
        path: "/edit/:id",
        component: () => import("@/components/board/Edit.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@/views/error/NotFoundPage.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
