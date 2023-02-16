<template>
  <nav
    class="p-3 bg-slate-400 dark:bg-gray-700 flex items-center gap-2 flex-row"
  >
    <!-- Mobile -->
    <NavBarDropdown :routes="routes" class="sm:w-[200px] md:hidden" />

    <!-- Desktop -->
    <ul class="gap-3 hidden md:flex">
      <li
        class="flex items-center"
        v-for="({ name, url }, index) in routes"
        :key="index"
      >
        <RouterLink
          :to="url"
          :class="['button', { active: globalStore.isActivePage(url) }]"
        >
          {{ name }}
        </RouterLink>
      </li>
    </ul>

    <div class="flex-1" />

    <div v-if="globalStore.user" class="space-x-2">
      <div class="inline-block space-x-2">
        <font-awesome-icon icon="fa-solid fa-user" class="text-lg text-white" />

        <span class="font-medium text-white hidden sm:inline text-base">
          {{ globalStore.user.name }}
        </span>
      </div>
      <LogoutButton />
    </div>
    <LoginButton v-else />
    <ToggleTheme />
    <ToggleLanguage />
  </nav>
</template>

<script setup lang="ts">
import { ToggleLanguage, ToggleTheme } from "@/components";
import { routes } from "@/mock";
import { useGlobalStore } from "@/stores";
import LoginButton from "./LoginButton.vue";
import LogoutButton from "./LogoutButton.vue";
import NavBarDropdown from "./NavBarDropdown.vue";

const globalStore = useGlobalStore();
</script>

<style>
/* CSS */
.button {
  --bg: #fcfcfd;
  --shadow-color: #d6d6e7;
  --color: #36395a;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg);
  border-radius: 4px;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, var(--shadow-color) 0 -3px 0 inset;
  color: var(--color);
  cursor: pointer;
  line-height: 1;
  padding: 10px 16px;
  position: relative;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  touch-action: manipulation;
  will-change: box-shadow, transform;
}

.button:focus {
  box-shadow: var(--shadow-color) 0 0 0 1.5px inset,
    rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
    var(--shadow-color) 0 -3px 0 inset;
}

.button:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, var(--shadow-color) 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button:active {
  box-shadow: var(--shadow-color) 0 3px 7px inset;
  transform: translateY(2px);
}

.button.active {
  --bg: theme("colors.green.100");
  --shadow-color: theme("colors.green.600");
  --color: theme("colors.green.700");
}
</style>
