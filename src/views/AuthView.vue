<template>
  <x-page
    class="fixed top-1/2 left-1/2 flex w-[300px] -translate-x-1/2 -translate-y-1/2 items-center md:w-[400px]"
  >
    <form class="flex-1" @submit.prevent="onSubmit">
      <h1 class="text-center text-2xl font-semibold md:text-3xl">Log In</h1>

      <x-input
        id="username"
        v-model="valueName"
        :label="t('label.name')"
        :error="errors.name"
      />
      <x-input
        id="password"
        v-model="valuePassword"
        :label="t('label.password')"
        :error="errors.password"
        type="password"
      />

      <div class="flex flex-col items-center">
        <x-button
          data-test="login"
          class="w-2/6"
          @click="valueType = TYPES.LOGIN"
        >
          {{ t("button.enter") }}
        </x-button>
        <span class="text-xs">{{ t("button.or") }}</span>
        <x-button
          data-test="signup"
          class="bg-slate-400 py-1.5 text-xs font-normal"
          @click="valueType = TYPES.SIGNUP"
          type="submit"
        >
          {{ t("button.signup") }}
        </x-button>
      </div>
    </form>
  </x-page>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from "@/enums";
import { useGlobalStore, useUserStore } from "@/stores";
import type { UserType } from "@/types";
import { useField, useForm } from "vee-validate";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { object, string } from "yup";

enum TYPES {
  LOGIN = "LOGIN",
  SIGNUP = "SIGNUP",
}

const { t } = useI18n();
const globalStore = useGlobalStore();
const userStore = useUserStore();
const router = useRouter();

const initialValues = { name: "", password: "", type: TYPES.LOGIN };

const validationSchema = computed(() =>
  object().shape({
    name: string().label(t("label.name")).required(),
    password: string().label(t("label.password")).min(6).required(),
    type: string().oneOf(Object.values(TYPES)).required(),
  })
);

const { errors, handleSubmit, setErrors } = useForm({
  initialValues,
  validationSchema,
});

const { value: valueName } = useField<string>("name");
const { value: valuePassword } = useField<string>("password");
const { value: valueType } = useField<TYPES>("type");

/**
 * Functions
 */

const onSubmit = handleSubmit((values) => {
  if (values.type === TYPES.LOGIN) {
    handleLogin(values);
  } else {
    handleSignup(values);
  }
});

function handleLogin(values: Pick<UserType, "name" | "password">) {
  const user = userStore.findByName(values.name);

  if (user && user.password === values.password) {
    globalStore.user = user;
    router.push({ name: ROUTE_NAMES.HOME });
  } else {
    setErrors({ name: t("invalid_user") });
  }
}

function handleSignup(values: typeof initialValues) {
  try {
    const { type, ...data } = values;

    const user = userStore.add(data);
    handleLogin(user);
  } catch (e: any) {
    setErrors({ name: (e as Error).message });
  }
}
</script>

<i18n lang="json">
{
  "en-US": {
    "invalid_user": "Invalid user name or password",
    "label": {
      "name": "Name",
      "password": "Password"
    },
    "button": {
      "enter": "Enter",
      "or": "or",
      "signup": "Sign Up"
    }
  },
  "pt-BR": {
    "invalid_user": "Nome ou senha de usuário inválida",
    "label": {
      "name": "Nome",
      "password": "Senha"
    },
    "button": {
      "enter": "Entrar",
      "or": "ou",
      "signup": "Cadastrar-se"
    }
  }
}
</i18n>
