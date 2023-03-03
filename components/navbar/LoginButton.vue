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
const router = useRouter();

function openUrl() {
  router.push('/auth');
}
</script>
