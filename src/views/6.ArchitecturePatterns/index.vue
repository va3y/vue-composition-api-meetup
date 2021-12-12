<template>
  <div class="text-xl max-w-3xl">
    <h1>Паттерны в архитектуре</h1>
    <h2>Надо ли выносить всю логику из setup в composable функции?</h2>
    <div
      class="
        mb-8
        border
        grid grid-cols-2
        text-center
        odd:border-r
        divide-x
        comp-table
        mx-auto
      "
    >
      <div class="border-b">Писать внутри сетапа</div>
      <div class="border-b">Выносить в .ts/.js файлы</div>
      <div class="text-green-500">
        + Не надо писать отделно setup и отдельно composable
      </div>
      <div class="text-green-500">+ Более расширяемый проект</div>
      <div class="text-red-600">
        - Если в будущем необходимо переиспользовать эту логику, необходимо все
        равно писать потом composable
      </div>
      <div class="text-green-500">
        + Легче сконцентрироваться на одной конкретной фиче, когда пишешь код
      </div>
      <div></div>
      <div class="text-red-600">- Больше бойлерплейта</div>
    </div>
    <div class="space-y-4">
      <strong>Какой выбор для себя сделал я:</strong>
      <div>
        - Использовать гибридный подход в MVP. Писать внутри setup по дефолту.
        Выносить в отдельные файлы при больших компонентах или понимании что
        этот кусок кода скорее всего будет переиспользован.
      </div>
      <div>- В больших проектах выносить все из сетапа</div>
    </div>
    <h2 class="mt-20">Как используют composable</h2>
    <div class="flex flex-col space-y-3 max-w-prose">
      <div>
        - Как я это использовал в моем проекте: папка
        <code>MyProjectComponent</code> в этом репозитории.
        <a
          href="https://patientportal-dev.noveogroup.com/auth?openStructureId=2"
          >Деплой проекта</a
        >
      </div>
      <a
        href="https://github.com/quasarframework/quasar/tree/dev/ui/src/composables"
        >- Composables в Quasar</a
      >Интересно что они разделяют composable на private и public
      <a
        href="https://github.com/vuetifyjs/vuetify/tree/next/packages/vuetify/src/composables"
        >- Composables во Vuetify@next</a
      >
      На данный момент все composables приватные. Посмотрим как будет
      развиваться проект.
      <a
        href="https://github.com/element-plus/element-plus/tree/151be696dd37ec5bf46dd72f6b328a97aa9a408e/packages/hooks"
        >- Hooks в Element plus.</a
      >Тоже использует composables, но они привязаны к конкретным компонентам.
      На данный момент этот код переиспользуется мало.
    </div>
  </div>
</template>

<style scoped>
a {
  @apply underline text-green-500;
}

.comp-table * {
  @apply p-6;
}
</style>
