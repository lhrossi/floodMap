<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';

interface CustomSelectProps {
  value: string;
  items: Array<CustomSelectItem>;
  placement?: 'top' | 'bottom';
}

interface CustomSelectItem {
  label: string;
  value: string;
};

type CustomSelectEmits = {
  change: [value: string];
}

const props = withDefaults(defineProps<CustomSelectProps>(), {
  placement: 'top',
});

const emit = defineEmits<CustomSelectEmits>();

const button = ref<HTMLButtonElement | null>(null);
const list = ref<HTMLUListElement | null>(null);
const open = ref<boolean>(false);

const label = computed<string>(() => {
  const [first] = props.items;

  return props.items.find((item) => item.value === props.value)?.label || first.label;
});

function toggle() {
  open.value = !open.value;
}

function close() {
  open.value = false;
}

function change(value: string) {
  emit('change', value);

  close();
}

onClickOutside(list, close, {
  ignore: [button],
});
</script>

<template>
  <div class="w-full relative">
    <button
      ref="button"
      class="w-full flex items-center gap-4 px-4 py-2 relative bg-neutral-100 rounded-3xl font-bold text-neutral-600 text-left"
      @click="toggle"
    >
      <ion-location-outline />

      <strong class="flex-1 text-neutral-600 mobile:text-sm laptop:text-base">{{ label }}</strong>

      <ion-chevron-down
        class="transition-transform"
        :class="`${open ? 'rotate-180' : 'rotate-0'}`"
      />
    </button>

    <ul
      v-if="open"
      ref="list"
      class="w-full absolute mobile:bottom-10 laptop:bottom-12 left-0 bg-neutral-100 shadow rounded-3xl overflow-y-auto mobile:max-h-[50vh] laptop:max-h-[80vh] pt-2"
      :class="{
        'bottom-full': placement === 'top',
        'top-full': placement === 'bottom',
      }"
    >
      <li v-for="item in items" :key="item.value">
        <button
          class="w-full px-12 py-2 text-left transition-colors hover:bg-neutral-200"
          :class="{
            'font-bold text-neutral-600': item.value === value,
            'text-neutral-500': item.value !== value,
          }"
          @click="change(item.value)"
        >
          {{ item.label }}
        </button>
      </li>
    </ul>
  </div>
</template>