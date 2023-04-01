<template>
  <Listbox v-model="selectedItem" as="div" :disabled="disabled">
    <label v-if="label" :for="id" :class="{ required }">{{ label }}</label>
    <ListboxButton
      v-bind="$attrs"
      :id="id"
      class="x-select"
      :class="{ has_error: error }"
    >
      <span v-if="selectedItem">{{ showTitle(selectedItem) }}</span>
      <span v-else class="text-gray-500">{{ placeholder || "&nbsp;" }}</span>

      <span class="flex items-center gap-2">
        <font-awesome-icon
          icon="fa-solid fa-circle-xmark"
          class="cursor-pointer text-gray-400 transition-colors hover:text-gray-500"
          @click.prevent="clearSelection"
        />
        <font-awesome-icon icon="fa-solid fa-chevron-down" />
      </span>
    </ListboxButton>

    <transition
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <ListboxOptions class="x-select__options">
        <slot name="options" v-bind="{ items }">
          <ListboxOption
            v-for="item in items"
            v-slot="{ active, selected }"
            :key="showValue(item)"
            :value="item"
            as="template"
          >
            <slot name="option" v-bind="{ item, active, selected }">
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="active ? 'bg-gray-100 text-gray-600' : 'text-gray-900'"
              >
                <span
                  class="block truncate"
                  :class="selected ? 'font-semibold' : 'font-normal'"
                >
                  {{ showTitle(item) }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-400"
                >
                  <font-awesome-icon icon="fa-solid fa-check" />
                </span>
              </li>
            </slot>
          </ListboxOption>
        </slot>
      </ListboxOptions>
    </transition>
    <small v-if="!hideError" class="block text-red-500">
      {{ error || "&nbsp;" }}
    </small>
  </Listbox>
</template>

<script setup lang="ts">
import { StringHelper } from "@/helpers";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { ref, watch } from "vue";

type Value = string | number | boolean | Record<string, any> | null | undefined;

interface IProps {
  modelValue?: string | Value;
  value?: string;
  id?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  items: Array<Value>;
  error?: string;

  itemTitle?: string;
  itemValue?: string;
  returnObject?: boolean;

  hideError?: boolean;
}

interface IEmit {
  (e: "change", payload: Event): void;
  (e: "input", payload: Event): void;
  (e: "update:modelValue", payload: Value | undefined): void;
}

const props = withDefaults(defineProps<IProps>(), {
  id: StringHelper.randomString(),
  modelValue: "",
  value: "",
  label: undefined,
  placeholder: undefined,
  error: undefined,
  itemTitle: "title",
  itemValue: "value",
});

const emit = defineEmits<IEmit>();

/**
 * Properties
 */

const selectedItem = ref<Value>(props.modelValue);

/**
 * Functions
 */

function clearSelection() {
  selectedItem.value = undefined;
}

function showTitle(item: Value) {
  if (props.itemTitle && item !== null && typeof item === "object") {
    return item[props.itemTitle];
  }

  const selected = props.items.find((i) => {
    if (i && typeof i === "object") {
      return String(i[props.itemValue]) === String(item);
    }

    return i === item;
  });

  if (selected && typeof selected === "object") {
    return selected[props.itemTitle];
  }

  if (selected !== undefined) {
    return selected;
  }

  return item;
}

function showValue(item: Value) {
  if (props.itemValue && item !== null && typeof item === "object") {
    return item[props.itemValue];
  }

  return item;
}

/**
 * Watches
 */

watch(selectedItem, (value) =>
  emit(
    "update:modelValue",
    props.returnObject || value === undefined ? value : showValue(value)
  )
);

watch(
  () => props.modelValue,
  (value) => (selectedItem.value = value)
);
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
