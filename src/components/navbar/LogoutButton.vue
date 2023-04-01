<template>
  <x-dialog
    type="warn"
    :title="t('logout-title')"
    :confirm="UserService.logout"
  >
    <template #action="{ on }">
      <x-button
        data-test="logout-button"
        class="ml-3 space-x-1 rounded-lg bg-slate-500 py-1 text-base text-white hover:bg-slate-600"
        v-on="on"
      >
        <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
        <span class="hidden sm:inline">{{ t("logout") }}</span>
      </x-button>
    </template>

    {{ t("logout-message") }}
  </x-dialog>
</template>

<script setup lang="ts">
import { UserService } from "@/services";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<i18n lang="json">
{
  "en-US": {
    "logout": "Logout",
    "logout-title": "Logout?",
    "logout-message": "Are you sure you want to logout?"
  },
  "pt-BR": {
    "logout": "Sair",
    "logout-title": "Deseja sair?",
    "logout-message": "Tem certeza que deseja sair?"
  }
}
</i18n>
