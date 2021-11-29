<script setup lang="ts">
import useOnMounted from '../../composable/useOnMounted'

const { state, onClick } = useOnMounted()
</script>

<template>
  <h1>
    Lifecycle hooks
    <br />(Хуки жизненного цикла)
  </h1>
  <img class="block h-screen" src="@/assets/lifecycle-hooks.png" />
  <div class="mt-20 text-3xl">
    state:
    <span class="text-white hover:text-black border p-2">{{ state }}</span>
  </div>
  <button class="mt-10 border p-2" @click="onClick">button</button>
</template>