<!-- Стиль script setup -->
<script setup lang="ts">
import useFeatureA from "./featureA";
import useFeatureB from "./featureB";

const { refA, computedA } = useFeatureA();
const { refB, computedB } = useFeatureB();
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
