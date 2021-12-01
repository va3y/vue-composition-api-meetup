<script setup lang="ts">
import { ref, onMounted } from "vue";

const state = ref("");

// Какие onMounted будет зарегистрированы?
onMounted(() => {
  state.value += "1 ";
});

const onClick = () => {
  onMounted(() => {
    state.value += "2 ";
  });
};

class Foo {
  constructor() {
    this.registerOnMounted();
  }

  registerOnMounted() {
    onMounted(() => {
      state.value += "3 ";
    });
  }
}
new Foo();

(async function () {
  onMounted(() => {
    state.value += "4 ";
  });
})();

(async function () {
  await Promise.resolve();
  onMounted(() => {
    state.value += "5 ";
  });
})();
</script>

<template>
  <h1>
    Lifecycle hooks
    <br />(Хуки жизненного цикла)
  </h1>
  <div class="text-xl">Какие onMounted будет зарегистрированы?</div>
  <img class="block h-screen" src="@/assets/lifecycle-hooks.png" />
  <div class="mt-20 text-3xl">
    state:
    <span class="text-white hover:text-black border p-2">{{ state }}</span>
  </div>
  <button class="mt-10 border p-2" @click="onClick">button</button>
</template>
