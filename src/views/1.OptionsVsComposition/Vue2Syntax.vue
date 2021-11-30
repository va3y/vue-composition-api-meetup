<script lang="ts">
import { defineComponent } from "vue";

//Стиль Options API. Логика компонента организованна по опциям.
export default defineComponent({
  data: () => ({
    refA: 1,
    refB: 2,
  }),
  computed: {
    computedA() {
      return this.refA + 10;
    },
    computedB() {
      return this.refA + 10;
    },
  },
});
</script>

<template>
  <h1>Options API vs Composition API</h1>
  <div class="border p-2">
    Feature A ref: {{ refA }}
    <br />
    Feature B ref: {{ refB }}
  </div>

  <div class="mt-4 border p-2">
    Feature A computed: {{ computedA }}
    <br />
    Feature B computed: {{ computedB }}
  </div>
</template>
