<template>
  <x-page>
    <UserForm :values="user" @submit="onSubmit" />
  </x-page>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';
import type { UserType } from '@/types';

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

<script lang="ts">
export default {
  beforeRouteEnter(to, from, next) {
    const userStore = useUserStore();

    const id = Number(to.params.id);
    const exist = userStore.findById(id);

    // if user not exist, redirect to 404 page
    if (!exist) {
      throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
    }

    next();
  },
};
</script>
