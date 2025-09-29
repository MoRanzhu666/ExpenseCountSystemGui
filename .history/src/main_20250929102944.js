import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css';
import ElementPlus from "element-plus"
import axios from "axios"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

const app = createApp(App)
app.provide("$axios",axios)
app.use(router)
app.use(ElementPlus)

for (const [name, component] of Object.entries(ElementPlusIconsVue)){
    app.component(name, component)
}

app.provide('focusTrapRef', { value: null })

app.mount("#app")