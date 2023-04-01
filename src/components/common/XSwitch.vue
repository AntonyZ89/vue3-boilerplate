<template>
  <div
    class="relative mx-2 inline-block w-10 cursor-pointer select-none align-middle transition duration-200 ease-in"
    @click="(e) => $emit('update:modelValue', !modelValue)"
  >
    <div
      :class="[
        { 'translate-x-[65%]': modelValue },
        `absolute z-[1] block h-6 w-6 rounded-full border-4 border-white bg-gray-400 transition-transform duration-200 dark:border-gray-500 dark:bg-gray-400`,
      ]"
    />
    <label
      for="toggle"
      class="toggle-label block h-6 cursor-pointer overflow-hidden rounded-full bg-white dark:bg-gray-500"
    ></label>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue?: boolean }>();

defineEmits<{
  (e: "update:modelValue", payload: boolean): void;
}>();
</script>
