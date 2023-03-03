<template>
  <x-page>
    <UserForm @submit="onSubmit" />
  </x-page>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';
import type { UserType } from '@/types';

const router = useRouter();

const userStore = useUserStore();

/**
 * Functions
 */

function onSubmit(values: Omit<UserType, 'id'>) {
  userStore.add(values);

  // TODO add notification

  router.push('/user');
}
</script>
