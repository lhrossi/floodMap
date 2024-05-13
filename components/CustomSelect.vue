<script setup lang="ts">
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
</script>

<template>
  <div class="w-full relative">
    <button
      class="w-full flex items-center gap-2 p-2 relative bg-neutral-100 rounded-3xl font-bold text-neutral-600 text-left"
      @click="toggle"
    >
      <ion-location-outline />

      <strong class="flex-1 text-neutral-600">{{ label }}</strong>

      <ion-chevron-down
        class="transition-transform"
        :class="{
          'rotate-180': (open && placement === 'bottom') || placement === 'top',
          'rotate-0': (open && placement === 'top') || placement === 'bottom'
        }"
      />
    </button>

    <ul
      v-if="open"
      class="w-full absolute left-0 bg-neutral-100 shadow rounded-3xl overflow-hidden"
      :class="{
        'bottom-full': placement === 'top',
        'top-full': placement === 'bottom',
      }"
    >
      <li v-for="item in items" :key="item.value">
        <button class="w-full px-8 py-2 text-left" @click="change(item.value)">
          {{ item.label }}
        </button>
      </li>
    </ul>
  </div>
</template>