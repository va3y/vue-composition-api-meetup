<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 1. Синтаксис.then
const data = ref(null)
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => res.json()
    .then(fetchedData => data.value = fetchedData))


// 2.IIFE 
// const data = ref(null);
// (async function () {
//     const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
//     data.value = await res.json()
// })()


// Suspense в родительском компоненте. Это пока что экспериментальная фича. 
// Так будет происходить в Nuxt 3.
// const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
// const data = await res.json()



// Использовать async в onMounted можно, но не всегда это лучшее решение
// API реквесте выгоднее использовать во время выполнения setup, это равносильно created хуку во Vue 2

// const data = ref(null);
// onMounted(async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
//   data.value = await res.json()
// })

</script>

<template>
  <h1>Async setup</h1>
  {{ data }}
</template>