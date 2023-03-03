<template>
  <div class="inline-block" :class="$attrs['class']">
    <label
      v-if="label"
      :for="id"
      :class="['text-left block leading-5', { required }]"
    >
      {{ label }}
    </label>
    <textarea
      v-bind="$attrs"
      :id="id"
      :value="modelValue || value"
      :class="[
        'py-1 rounded-lg text-gray-900 block text-xs sm:text-sm disabled:bg-gray-200 disabled:text-gray-500',
        { 'border-red-500': error },
        fieldClass,
      ]"
      :placeholder="placeholder"
      :readonly="readonly"
      :type="type"
      @input="
        (e) => {
          $emit('input', e);
          $emit('update:modelValue', (e.target as HTMLInputElement).value);
        }
      "
    />
    <small v-if="!hideError" class="text-red-500 block">
      {{ error || '&nbsp;' }}
    </small>
  </div>
</template>

<script setup lang="ts">
import { StringHelper } from '@/helpers';

type InputTypes =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

interface IProps {
  modelValue?: string | number | undefined;

  id?: string;
  label?: string;
  value?: string;
  required?: boolean;
  fieldClass?: string | Array<string | Object>;
  placeholder?: string;
  readonly?: boolean;
  type?: InputTypes;
  error?: string | undefined;

  hideError?: boolean;
}

interface IEmit {
  (e: 'input', payload: Event): void;
  (e: 'update:modelValue', payload: string): void;
}

withDefaults(defineProps<IProps>(), {
  id: () => StringHelper.randomString(),
  value: '',
  type: 'text',
});

defineEmits<IEmit>();
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
