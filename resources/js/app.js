import "./bootstrap";

import { createApp } from "vue";

import router from "./router/index.js";
import App from "./components/App.vue";
import store from "./store/index.js";

createApp(App).use(router).use(store).mount("#app");
