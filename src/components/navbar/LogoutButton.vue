<template>
  <x-dialog type="warn" title="Deseja sair?" :confirm="UserService.logout">
    <template #action="{ on }">
      <x-button
        class="bg-slate-500 text-base text-white py-1 rounded-lg hover:bg-slate-600 ml-3 space-x-1"
        v-on="on"
      >
        <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
        <span class="hidden sm:inline">Sair</span>
      </x-button>
    </template>

    Para sair, confirme abaixo.
  </x-dialog>
</template>

<script setup lang="ts">
import { UserService } from "@/services";
</script>
