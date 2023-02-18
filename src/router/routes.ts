import i18n from "@/i18n";
import { computed } from "vue";
import type { ComputedRef } from "vue";
import { useGlobalStore } from "@/stores";
import { ROUTE_NAMES } from "@/enums";
import type { RouteList } from "./";

const t = i18n.global.t;

export const enabledRoutes: ComputedRef<Array<RouteList>> = computed(() => {
  const store = useGlobalStore();

  const isAuth = Boolean(store.user);

  const _ = {
    home: {
      name: t("home"),
      url: { name: ROUTE_NAMES.HOME },
    },
    users: {
      name: t("users"),
      url: { name: ROUTE_NAMES.USER },
    },
    profile: {
      name: t("profile"),
      url: { name: ROUTE_NAMES.PROFILE },
    },
  };

  const list = [_.home];

  if (isAuth) list.push(_.profile, _.users);

  return list;
});
