<template>
  <form class="flex items-center gap-2" @submit="onSubmit">
    <x-input
      id="name"
      v-model="valueName"
      required
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

    <x-button type="submit" data-test="update">
      {{ t("button.enter") }}
    </x-button>
  </form>
</template>

<script setup lang="ts">
import type { UserType, UserTypeCreate } from "@/types";
import { useField, useForm } from "vee-validate";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { lazy, object, string } from "yup";

const props = withDefaults(defineProps<{ values?: UserTypeCreate }>(), {
  values: () => ({ name: "" }),
});

const emit = defineEmits<{
  (e: "submit", payload: Omit<UserType, "id">): void;
}>();

const { t } = useI18n();

const initialValues = { name: props.values.name, password: "" };

const validationSchema = computed(() =>
  object().shape({
    name: string().label(t("label.name")).required(),
    password: lazy(() => {
      let context = string()
        .label(t("label.password"))
        .min(6)
        .nullable()
        .transform((value) => value || null);

      if (!props.values.id) {
        context = context.required();
      }

      return context;
    }),
  })
);

const { errors, handleSubmit } = useForm({
  initialValues,
  validationSchema,
});

const { value: valueName } = useField<string>("name");
const { value: valuePassword } = useField<string>("password");

/**
 * Functions
 */

const onSubmit = handleSubmit((values) => emit("submit", values));
</script>

<i18n lang="json">
{
  "en-US": {
    "label": {
      "name": "Name",
      "password": "Password"
    },
    "button": {
      "enter": "Update"
    }
  },
  "pt-BR": {
    "label": {
      "name": "Nome",
      "password": "Senha"
    },
    "button": {
      "enter": "Atualizar"
    }
  }
}
</i18n>
