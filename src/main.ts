import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import { router } from "./router/routes";

createApp(App).use(router).mount("#app");
