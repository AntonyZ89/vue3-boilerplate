<template>
  <div
    :class="[
      'rounded-lg border-2 border-slate-800 p-2 text-center dark:border',
      colorProps,
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

interface Props {
  type?: "danger" | "warning" | "info";
}

const props = defineProps<Props>();
let colorProps = ref("");

watchEffect(() => {
  switch (props.type) {
    case "danger":
      colorProps.value = "bg-red-500 text-white dark:border-white";
      break;
    case "warning":
      colorProps.value = "bg-yellow-300 text-slate-600 dark:border-white";
      break;
    case "info":
    default:
      colorProps.value = "bg-blue-900 text-white dark:border-blue-600";
  }
});
</script>
