import { ROUTE_NAMES } from "@/enums";
import type { RouteRecordRaw } from "vue-router";

export interface RouteList {
  name: string;
  url: { name: ROUTE_NAMES };
}

export function getRoutePath(routeName: ROUTE_NAMES): string | null {
  const route = routes.find((route) => route.name === routeName);

  return route?.path || null;
}

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/",
    name: ROUTE_NAMES.HOME,
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/users",
    name: ROUTE_NAMES.USER,
    component: () => import("@/views/user/IndexView.vue"),
  },
  {
    path: "/user/:id",
    name: ROUTE_NAMES.USER_UPDATE,
    component: () => import("@/views/user/UpdateView.vue"),
  },
  {
    path: "/user/create",
    name: ROUTE_NAMES.USER_CREATE,
    component: () => import("@/views/user/CreateView.vue"),
  },
  {
    path: "/profile",
    name: ROUTE_NAMES.PROFILE,
    component: () => import("@/views/ProfileView.vue"),
  },
  {
    path: "/auth",
    name: ROUTE_NAMES.AUTH,
    component: () => import("@/views/AuthView.vue"),
    meta: {
      layout: "empty",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: ROUTE_NAMES.NOT_FOUND,
    component: () => import("@/views/404.vue"),
  },
];
