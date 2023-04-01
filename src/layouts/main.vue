<script setup lang="ts">
import { Footer, NavBar } from "@/components";
</script>

<template>
  <NavBar />

  <div class="h-full flex-1">
    <main class="sm:px-auto container mx-auto space-y-3 py-3 px-3">
      <RouterView />
    </main>

    <notifications
      class="mr-2 mt-20 min-w-[200px] max-w-sm sm:mt-16"
      style="width: auto"
      group="top-right"
      position="top right"
      close-on-click
    />
    <notifications />
  </div>

  <Footer />
</template>
