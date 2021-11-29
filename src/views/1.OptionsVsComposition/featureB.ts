import { ref, computed } from "vue";

export default function () {
  const refB = ref(2);
  const computedB = computed(() => refB.value + 10);
  return {
    refB,
    computedB,
  };
}
