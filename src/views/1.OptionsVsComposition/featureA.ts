import { ref, computed } from "vue";

export default function () {
  const refA = ref(1);
  const computedA = computed(() => refA.value + 10);
  return {
    refA,
    computedA,
  };
}
