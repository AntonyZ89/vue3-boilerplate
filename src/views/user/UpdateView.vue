<template>
  <x-page>
    <UserForm :values="user" @submit="onSubmit" />
  </x-page>
</template>

<script setup lang="ts">
import { UserForm } from "@/components";
import { useUserStore } from "@/stores";
import type { UserType } from "@/types";
import { useRoute } from "vue-router";

const route = useRoute();
const id = typeof route.params.id === "string" ? Number(route.params.id) : NaN;

// TODO THROW NOT FOUND

const userStore = useUserStore();
const user = userStore.findById(id)!; // TODO remover [[!]]

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
