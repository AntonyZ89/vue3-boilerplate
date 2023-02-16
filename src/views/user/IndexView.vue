<template>
  <x-page>
    <div class="pb-2 text-end">
      <router-link
        class="x-button bg-blue-500 hover:bg-blue-600"
        :to="{ name: ROUTE_NAMES.USER_CREATE }"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />

        Create
      </router-link>
    </div>

    <x-table :headers="headers" :items="userStore.users">
      <template #[`item.actions`]="{ item }">
        <router-link
          class="x-button bg-blue-500 hover:bg-blue-600"
          :to="{ name: ROUTE_NAMES.USER_UPDATE, params: { id: item.id } }"
        >
          <font-awesome-icon icon="fa-solid fa-pen-to-square" />
        </router-link>
      </template>
    </x-table>
  </x-page>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from "@/enums";
import { useUserStore } from "@/stores";

const headers = [
  { text: "ID", value: "id" },
  { text: "Name", value: "name" },
  { text: "Actions", value: "actions", headerClass: "w-[10%]" },
];

const userStore = useUserStore();
</script>
