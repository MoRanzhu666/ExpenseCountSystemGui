import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from "element-plus";
import axios from "axios";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import loadingUtils from "@/utils/loading.js";
import "./assets/css/loading.css";

const app = createApp(App);
app.provide("$axios", axios);
app.use(router);
app.use(loadingUtils);
app.use(ElementPlus, {
  locale: zhCn,
});

for (const [name, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(name, component);
}

app.component(ElDropdown.name, ElDropdown);
app.component(ElDropdownMenu.name, ElDropdownMenu);
app.component(ElDropdownItem.name, ElDropdownItem);
app.mount("#app");
