<template>
  <div class="inline-block">
    <label :for="id" :class="['text-left block leading-5', { required }]">
      {{ label }}
    </label>

    <select
      v-bind="$attrs"
      :id="id"
      :value="modelValue || value"
      :class="[
        'py-[5px] rounded-lg text-gray-900 block text-xs sm:text-sm',
        { 'border-red-500': error },
        fieldClass,
      ]"
      @change="(e) => emit('change', e)"
      @input="
        (e) => {
          emit('input', e);
          emit('update:modelValue', (e.target as HTMLSelectElement).value);
        }
      "
    >
      <option value="" v-if="placeholder">
        {{ placeholder }}
      </option>
      <option
        v-for="{ key, value } in values"
        :selected="modelValue === value"
        :value="value"
        :key="value"
      >
        {{ key }}
      </option>
    </select>

    <small class="text-red-500 block" v-if="!hideError">
      {{ error || "&nbsp;" }}
    </small>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { StringHelper } from "@/helpers";

interface IProps {
  modelValue?: unknown;
  value?: string;
  id?: string;
  label: string;
  required?: boolean;
  fieldClass?: string;
  placeholder?: string;
  values: Array<{ key: string; value: string }>;
  error?: string;

  hideError?: boolean;
}

interface IEmit {
  (e: "change", payload: Event): void;
  (e: "input", payload: Event): void;
  (e: "update:modelValue", payload: string): void;
}

withDefaults(defineProps<IProps>(), {
  id: StringHelper.randomString(),
});

const emit = defineEmits<IEmit>();
</script>
