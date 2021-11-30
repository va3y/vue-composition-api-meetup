<script setup lang="ts">
import {
  usePreferredDark,
  useAsyncState,
  useDraggable,
  debouncedWatch,
  useStorage,
} from "@vueuse/core";
import { ref } from "vue";

const { state, isReady } = useAsyncState(
  async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    return await res.json();
  },
  // Дефолтное значение
  { id: "Loading..." },
  // Опции useAsyncState
  {
    onError: (e) => {
      console.error("Error!", e);
      state.value = "fallback";
    },
  }
);

const isDark = usePreferredDark();

const draggable = ref<HTMLElement | null>(null);
const { x, y, style } = useDraggable(draggable, {
  initialValue: { x: 400, y: 800 },
});

const source = ref("");
const debouncedState = ref("");

debouncedWatch(
  source,
  (newVal) => {
    debouncedState.value = newVal;
  },
  { debounce: 500 }
);

const localStorageData = useStorage("foo", undefined);
</script>

<template>
  <h1>
    <a href="https://vueuse.org/" class="underline">VueUse</a>
  </h1>
  <ul class="list-disc text-xl mb-20 max-w-xl space-y-3">
    <li>
      Очень много полезных хелпер функций.
      <br />Не надо писать их самому / копипастить из проекта в проект
    </li>
    <li>Не ударяет по размеру бандла</li>
    <li>
      Простой и понятный исходный код. Все построенно на функциях Composition
      API.
    </li>
  </ul>
  <div class="text-xl font-semibold mb-4">Особенно полезные функции:</div>
  <ul class="list-disc text-xl mb-20 max-w-xl space-y-3">
    <li>
      useAsyncState отлично решают предыдущую проблему асинхронного сетапа.
    </li>
    <li>
      Очень удобно использовать session и local storage. Не крашится от
      <code>JSON.parse('undefined')</code>😂
    </li>
    <li>debouncedWatch</li>
  </ul>
  <div>usePreferredDark: {{ isDark }}</div>
  <div>
    useAsyncState: {{ state }}
    <br />
    isReady: {{ isReady }}
  </div>

  <div
    ref="draggable"
    :style="style"
    class="
      fixed
      cursor-pointer
      bg-gray-100
      p-2
      rounded-xl
      w-60
      h-28
      select-none
    "
  >
    useDraggable. Координаты:
    <br />
    {{ x }}, {{ y }}
  </div>

  <div>
    debouncedWatch: {{ debouncedState }}
    <br />
    <input class="border" type="text" v-model="source" />
  </div>
  <div>localStorageData: {{ localStorageData }}</div>
</template>
