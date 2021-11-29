import { createRouter, createWebHashHistory } from "vue-router";

import OptionsVsComposition from "@/views/1.OptionsVsComposition/index.vue";
import Async from "@/views/2.Async/index.vue";
import VueUse from "@/views/3.VueUse/index.vue";
import LifecycleHooks from "@/views/4.LifecycleHooks/index.vue";

const routes = [
  { path: "/", component: OptionsVsComposition },
  { path: "/1", component: OptionsVsComposition },
  { path: "/2", component: Async },
  { path: "/3", component: VueUse },
  { path: "/4", component: LifecycleHooks },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
