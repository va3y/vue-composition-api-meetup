<script setup lang="ts">
import { PropType } from "vue";

interface CustomPropType {
  bar: string;
  baz: number;
}

// Перегрузки define props:

// Наподобии props в Options API
defineProps({
  foo: {
    type: Object as PropType<CustomPropType>,
    required: false,
    default: () => ({
      bar: "",
      baz: 0,
    }),
  },
});

// Через дженерик. Теперь не нужен PropType!
// defineProps<{ foo: CustomPropType }>();

// Дефолтное значение через дженерик указывается вот так:
// withDefaults(
//   defineProps<{
//     foo: CustomPropType;
//   }>(),
//   {
//     foo: () => ({
//       bar: "",
//       baz: 0,
//     }),
//   }
// );

// Эмиты теперь тоже можно типизировать более кратко:
defineEmits<{ (foo: "foo"): string }>();
</script>

<template>
  <div class="max-w-prose text-xl">
    <h1>TypeScript</h1>
    <h2 class="mt-16">defineProps()</h2>
    <img src="@/assets/define-props.png" />
    <h2 class="mt-16">Типизация return</h2>
    <div class="mt-16">
      Не обязательно типизировать return в composable функциях. Это пустая трата
      времени, так как return в 99% случаев может быть имплицитно типизорован
      нами самими, когда мы пишем composable функцию.
      <br />
      <br />Если eslint
      ругуется, можно поставить
      <code>'@typescript-eslint/explicit-module-boundary-types': 'error',</code>
      в .eslintrc
      <img class="my-8" src="@/assets/no-return-type.png" />
    </div>

    <h2 class="mt-16">TS + Vue 3 + Volar</h2>
    <div class="mb-16">
      Volar пришел на замену Vetur и теперь официально рекомендован для
      использования во Vue 3. Я бы его использовал c Vue 3 точно, для Vue 2
      старый Vetur более оптимален на мой взгляд.
      <br />
      <br />Его главная фича:
      <strong>типизиация эмитов и пропов в template из коробки.</strong>
      <br />
      <br />Полезная ссылка:
      <a
        class="underline text-green-500"
        href="https://github.com/johnsoncodehk/volar/tree/master/extensions/vscode-vue-language-features#:~:text=Define%20Global%20Components"
      >Как можно зарегистрировать глобальные компоненты в Volar</a>
    </div>
  </div>
</template>
