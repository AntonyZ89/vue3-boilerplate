<template>
  <x-page>
    <UserForm :values="globalStore.user" @submit="onSubmit" />
  </x-page>
</template>

<script setup lang="ts">
import { UserForm } from "@/components";
import { useGlobalStore, useUserStore } from "@/stores";
import type { UserType } from "@/types";

const globalStore = useGlobalStore();
const userStore = useUserStore();

/**
 * Functions
 */

function onSubmit(values: Omit<UserType, "id">) {
  const result: Partial<typeof values> = { ...values };

  // prevent empty password
  if (!values.password) {
    delete result.password;
  }

  userStore.update(globalStore.user!.id, result);

  // TODO add notification
}
</script>
