<template>
  <x-dialog
    type="warn"
    :title="t('logout-title')"
    :confirm="UserService.logout"
  >
    <template #action="{ on }">
      <x-button
        data-test="logout-button"
        class="bg-slate-500 text-base text-white py-1 rounded-lg hover:bg-slate-600 ml-3 space-x-1"
        v-on="on"
      >
        <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
        <span class="hidden sm:inline">{{ t('logout') }}</span>
      </x-button>
    </template>

    {{ t('logout-message') }}
  </x-dialog>
</template>

<script setup lang="ts">
import { UserService } from '@/services';

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
