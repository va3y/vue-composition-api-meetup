<script setup lang="ts">
const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
const data = await res.json()
</script>

<template>
    <h1>Async setup</h1>
    {{ data }}
</template>