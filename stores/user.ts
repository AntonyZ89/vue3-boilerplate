import { defineStore } from 'pinia';
import { useGlobalStore } from './global';
import type { UserType, UserTypeRegister } from '@/types';

interface State {
  users: Array<UserType>;
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    users: [],
  }),
  actions: {
    findById(id: number) {
      return this.users.find((user) => user.id === id);
    },
    findByName(name: string) {
      return this.users.find((user) => user.name === name);
    },
    add(user: UserTypeRegister): UserType {
      const { $i18n } = useNuxtApp();
      const alreadyExists = this.users.some(({ name }) => name === user.name);

      if (alreadyExists) {
        throw new Error($i18n.t('user.alreadyExists', { name: user.name }));
      }

      const result = {
        id: this.users.length + 1,
        ...user,
      };

      this.users.push(result);

      return result;
    },
    update(id: number, values: Partial<Omit<UserType, 'id'>>): UserType {
      const { $i18n } = useNuxtApp();
      const index = this.users.findIndex((user) => user.id === id);

      if (index === -1) {
        throw new Error($i18n.t('user.notFoundId', { id }));
      }

      const globalStore = useGlobalStore();

      const result = {
        ...this.users[index],
        ...values,
      };

      const user = (this.users[index] = result);

      if (globalStore.user?.id === id) {
        globalStore.user = user;
      }

      return user;
    },
  },
});
