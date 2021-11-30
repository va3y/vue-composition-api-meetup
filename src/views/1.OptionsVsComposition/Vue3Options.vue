<script lang="ts">
import { defineComponent } from "vue";

import useFeatureA from "./featureA";
import useFeatureB from "./featureB";

// Стиль Composition API. Организуем логику по фичам
export default defineComponent({
  setup() {
    const { refA, computedA } = useFeatureA();
    const { refB, computedB } = useFeatureB();

    return {
      refA,
      refB,
      computedA,
      computedB,
    };
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
