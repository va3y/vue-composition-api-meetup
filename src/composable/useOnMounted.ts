import { onMounted, ref } from "vue";

// Какой onMounted зарегистрируется, а какой нет?
export default function () {
  const state = ref("");

  // 1
  onMounted(() => {
    state.value += "1 ";
  });

  // 2
  const onClick = () => {
    onMounted(() => {
      state.value += "2 ";
    });
  };

  // 3
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

  // 4
  (async function () {
    onMounted(() => {
      state.value += "4 ";
    });
  })();

  // 5
  (async function () {
    await Promise.resolve();
    onMounted(() => {
      state.value += "5 ";
    });
  })();

  return {
    state,
    onClick,
  };
}
