<template>
  <div class="x-badge inline-block rounded-full px-2 py-0.5 text-xs">
    <slot />
  </div>
</template>

<style>
.x-badge {
  background-color: theme("backgroundColor.gray.200");
  color: theme("textColor.gray.800");
}
</style>
