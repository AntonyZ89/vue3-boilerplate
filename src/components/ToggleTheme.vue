<template>
  <div class="inline-block p-1">
    <MoonIcon class="w-6 h-6 text-gray-500 dark:text-gray-400 inline" />
    <x-switch v-model="isLightTheme" />
    <SunIcon class="w-6 h-6 text-yellow-500 dark:text-yellow-400 inline" />
  </div>
</template>
<script setup lang="ts">
import { MoonIcon, SunIcon } from "@heroicons/vue/24/solid";
import { onBeforeMount, ref, watch } from "vue";

const isLightTheme = ref<undefined | boolean>(undefined);

onBeforeMount(() => {
  let preferredTheme = localStorage.getItem("user-theme");

  if (!preferredTheme) {
    preferredTheme = matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  isLightTheme.value = preferredTheme === "light";
});

watch(isLightTheme, (bool) => {
  const theme = bool ? "light" : "dark";

  localStorage.setItem("user-theme", theme);
  document.documentElement.className = theme;
});
</script>
