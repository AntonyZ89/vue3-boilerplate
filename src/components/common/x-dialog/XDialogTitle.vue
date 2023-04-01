<template>
  <div class="x-dialog-title flex w-full gap-x-2 border-b py-3 px-4">
    <div
      v-if="type === 'info'"
      class="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
    >
      <font-awesome-icon
        icon="fa-solid fa-circle-info"
        class="text-xl text-blue-400"
      />
    </div>
    <div
      v-else-if="type === 'warn'"
      class="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10"
    >
      <font-awesome-icon
        icon="fa-solid fa-triangle-exclamation"
        class="text-xl text-yellow-400"
      />
    </div>
    <div
      v-else-if="type === 'danger'"
      class="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
    >
      <font-awesome-icon
        icon="fa-solid fa-circle-exclamation"
        class="text-xl text-red-400"
      />
    </div>

    <h3
      class="flex flex-1 items-center text-center text-lg font-medium leading-6 text-gray-900 sm:text-left"
      id="modal-headline"
    >
      {{ title }}
    </h3>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type: "info" | "warn" | "danger";
  title: string;
}>();
</script>
