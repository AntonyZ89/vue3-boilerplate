<template>
  <div class="x-table relative overflow-x-auto">
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead
        class="bg-slate-300 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th
            scope="col"
            :class="['py-3 px-6', headerClass]"
            v-for="({ text, headerClass }, index) in headers"
            :key="index"
          >
            {{ text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="items.length">
          <tr
            v-for="(item, index) in items"
            :key="index"
            class="border-b bg-slate-100 dark:border-gray-700 dark:bg-gray-800"
          >
            <td
              v-for="({ value, cellClass, transform }, headerIndex) in headers"
              :class="['py-2 px-6', cellClass]"
              :key="headerIndex"
            >
              <slot :name="`item.${value}`" v-bind="{ item }">
                {{
                  (transform ? transform(item) : getValue(item, value)) ?? ""
                }}
              </slot>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td
              class="bg-gray-200 py-2 px-6 text-gray-600"
              :colspan="headers.length"
            >
              Nenhum dado encontrado.
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  headers: Array<{
    text?: string;
    value: string;
    headerClass?: string;
    cellClass?: string;
    transform?: (item: any) => any;
  }>;
  items: Array<any>;
}>();

function getValue(item: (typeof props.items)[0], field: string) {
  if (field.includes(".")) {
    const args = field.split(".");
    let value: any = item;

    for (const arg of args) value = value[arg];

    return value;
  }

  return item?.[field];
}
</script>
