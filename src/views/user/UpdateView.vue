<template>
  <x-page>
    <UserForm :values="user" @submit="onSubmit" />
  </x-page>
</template>

<script lang="ts">
export default {
  beforeRouteEnter(to, from, next) {
    const userStore = useUserStore();

    const id = Number(to.params.id);
    const exist = userStore.findById(id);

    // if user not exist, redirect to 404 page
    if (!exist) {
      return next({
        name: ROUTE_NAMES.NOT_FOUND,
        params: {
          pathMatch: to.path.split("/").slice(1),
        },
      });
    }

    next();
  },
};
</script>

<script setup lang="ts">
import { UserForm } from "@/components";
import { ROUTE_NAMES } from "@/enums";
import { useUserStore } from "@/stores";
import type { UserType } from "@/types";
import { useRoute } from "vue-router";

const route = useRoute();
const id = Number(route.params.id);

const userStore = useUserStore();
const user = userStore.findById(id)!;

/**
 * Functions
 */

function onSubmit(values: Partial<UserType>) {
  const result: Partial<typeof values> = { ...values };

  // prevent empty password
  if (!values.password) {
    delete result.password;
  }

  userStore.update(user.id, result);

  // TODO add notification
}
</script>
