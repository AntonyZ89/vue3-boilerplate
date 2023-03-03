import { defineStore } from 'pinia';
import type { UserType } from '@/types';
import { RoutesNamedLocationsResolved } from '~~/.nuxt/typed-router/__routes';

interface StateTree {
  user?: UserType;
}

const useGlobalStore = defineStore('global', {
  state: (): StateTree => ({
    user: undefined,
  }),
  actions: {
    isActivePage(url: RoutesNamedLocationsResolved) {
      const route = useRoute();

      return typeof url === 'object' && route.name === url.name;
    },
  },
});

export { useGlobalStore };
