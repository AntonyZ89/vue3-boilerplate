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
      <option v-if="placeholder" value="">
        {{ placeholder }}
      </option>
      <option
        v-for="{ key, value } in values"
        :key="value"
        :selected="modelValue === value"
        :value="value"
      >
        {{ key }}
      </option>
    </select>

    <small v-if="!hideError" class="text-red-500 block">
      {{ error || '&nbsp;' }}
    </small>
  </div>
</template>

<script setup lang="ts">
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
  (e: 'change', payload: Event): void;
  (e: 'input', payload: Event): void;
  (e: 'update:modelValue', payload: string): void;
}

withDefaults(defineProps<IProps>(), {
  id: StringHelper.randomString(),
});

const emit = defineEmits<IEmit>();
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
