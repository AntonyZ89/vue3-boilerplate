<template>
  <footer
    class="flex justify-between items-center py-3 px-3 md:px-10 bg-white dark:bg-gray-800 text-slate-700 dark:text-white text-center"
  >
    <div class="font-medium">Vue Boilerplate © {{ currentYear }}</div>

    <div class="font-medium">
      Developed by
      <x-tooltip text="🐼">
        <a
          class="font-medium"
          href="https://github.com/antonyz89"
          target="_blank"
        >
          AntonyDEV
        </a>
      </x-tooltip>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
