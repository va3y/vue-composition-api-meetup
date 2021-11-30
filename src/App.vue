<script setup lang="ts"></script>

<template>
  <div class="flex flex-wrap px-10 min-h-screen w-screen relative max-w-full">
    <nav
      class="
        text-green-800
        self-start
        flex flex-col
        justify-start
        md:border-r md:h-screen
        mb-14
        md:mb-0
        w-full
        md:w-auto
        space-y-3
        text-xl
        max-w-xs
        py-10
        md:sticky
        top-0
        pr-4
      "
    >
      <div>Митап:</div>
      <div class="font-semibold text-3xl pb-10">
        Как построить проект с нуля вокруг нового Composition API
      </div>
      <RouterLink to="/1">1. Compositon API vs. Options API</RouterLink>
      <RouterLink to="/2">2. Async setup</RouterLink>
      <RouterLink to="/3">3. VueUse</RouterLink>
      <RouterLink to="/4">4. Хуки жизненного цикла</RouterLink>
      <RouterLink to="/5">5. Typescript</RouterLink>
      <RouterLink to="/6">6. Паттерны в архитектуре</RouterLink>
    </nav>
    <div class="flex-1 h-full flex py-10 flex-col items-center">
      <!-- <Suspense> -->
      <router-view />
      <!-- </Suspense> -->
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
