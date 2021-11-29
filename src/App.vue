<script setup lang="ts"></script>

<template>
  <div class="flex items-center px-10 h-screen w-screen p-10">
    <nav
      class="text-green-800 self-start flex flex-col justify-start border-r h-full p-4 space-y-2 text-xl max-w-xs"
    >
      <div>Митап:</div>
      <div
        class="font-semibold text-3xl pb-10"
      >Как построить проект с нуля вокруг нового Composition API</div>
      <RouterLink to="/1">1. Compositon API vs. Options API</RouterLink>
      <RouterLink to="/2">2. Async setup</RouterLink>
      <RouterLink to="/3">3. VueUse</RouterLink>
      <RouterLink to="/4">4. Lifecycle hooks</RouterLink>
    </nav>
    <div class="flex-1 h-full flex flex-col items-center">
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
