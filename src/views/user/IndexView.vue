<template>
  <x-page>
    <div class="pb-2 text-end">
      <router-link
        class="x-button bg-blue-500 hover:bg-blue-600"
        :to="{ name: ROUTE_NAMES?.USER_CREATE }"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />

        {{ t("button.create") }}
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
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const userStore = useUserStore();
const { t } = useI18n();

const headers = computed(() => [
  { text: "ID", value: "id" },
  { text: t("header.name"), value: "name" },
  { text: t("header.actions"), value: "actions", headerClass: "w-[10%]" },
]);
</script>

<i18n lang="json">
{
  "en-US": {
    "button.create": "Create",
    "header": {
      "name": "Name",
      "actions": "Actions"
    }
  },
  "pt-BR": {
    "button.create": "Criar",
    "header": {
      "name": "Nome",
      "actions": "Ações"
    }
  }
}
</i18n>
