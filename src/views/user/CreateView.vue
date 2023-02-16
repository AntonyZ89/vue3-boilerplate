<template>
  <x-page>
    <UserForm @submit="onSubmit" />
  </x-page>
</template>

<script setup lang="ts">
import { UserForm } from "@/components";
import { ROUTE_NAMES } from "@/enums";
import { useUserStore } from "@/stores";
import type { UserType } from "@/types";
import { useRouter } from "vue-router";

const router = useRouter();

const userStore = useUserStore();

/**
 * Functions
 */

function onSubmit(values: Omit<UserType, "id">) {
  userStore.add(values);

  // TODO add notification

  router.push({ name: ROUTE_NAMES.USER });
}
</script>
