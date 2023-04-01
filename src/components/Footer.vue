<template>
  <footer
    class="flex items-center justify-between bg-white py-3 px-3 text-center text-slate-700 dark:bg-gray-800 dark:text-white md:px-10"
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
