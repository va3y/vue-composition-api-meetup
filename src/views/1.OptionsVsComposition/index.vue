<script lang="ts">
import { defineComponent, ref, computed } from "vue";

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











import useFeatureA from "./featureA";
import useFeatureB from "./featureB";

// Стиль Composition API. Организуем логику по фичам
// export default defineComponent({
//   setup() {
//     const { refA, computedA } = useFeatureA();
//     const { refB, computedB } = useFeatureB();

//     return {
//       refA,
//       refB,
//       computedA,
//       computedB,
//     };
//   },
// });
</script>













<!-- Стиль script setup -->
<!-- <script setup lang="ts">
import useFeatureA from "./featureA";
import useFeatureB from "./featureB";

const { refA, computedA } = useFeatureA();
const { refB, computedB } = useFeatureB();
</script> -->

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
