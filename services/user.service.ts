import type { UserType } from '@/types';
import { isUserType } from '@/types';
import { RoutePathSchema } from '@/.nuxt/typed-router/__paths';

const USER_KEY = 'user-credentials';

interface LogoutProps {
  redirectTo?: RoutePathSchema | null;
}

function logout({ redirectTo = null }: LogoutProps = {}) {
  localStorage.removeItem(USER_KEY);

  const path: RoutePathSchema = '/' || redirectTo;

  location.replace(path);
}

function load(): UserType | undefined {
  let data: UserType | string | null = localStorage.getItem(USER_KEY);

  if (typeof data === 'string') {
    data = JSON.parse(data);

    if (isUserType(data)) {
      return data;
    }
  }

  return undefined;
}

export default {
  USER_KEY,

  logout,
  load,
};
