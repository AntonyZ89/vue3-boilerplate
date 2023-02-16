<template>
  <x-button
    class="bg-purple-500 text-base text-white py-1 hover:bg-purple-600"
    @click="openUrl"
  >
    <font-awesome-icon icon="fa-solid fa-right-to-bracket" />
    Login
  </x-button>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from "@/enums";
import { useRouter } from "vue-router";

const router = useRouter();

function openUrl() {
  router.push({ name: ROUTE_NAMES.AUTH });
}
</script>
