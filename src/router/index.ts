import { ROUTE_NAMES } from "@/enums";
import { useGlobalStore } from "@/stores";
import { routes } from "@/types";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export const GUEST_ROUTES: Array<string> = [ROUTE_NAMES.HOME, ROUTE_NAMES.AUTH];

router.beforeEach(async (to) => {
  if (typeof to.name !== "string") return;

  const globalStore = useGlobalStore();

  const isAuthenticated = !!globalStore.user;

  if (!isAuthenticated && !GUEST_ROUTES.includes(to.name)) {
    return { name: ROUTE_NAMES.HOME };
  }
});

export default router;
