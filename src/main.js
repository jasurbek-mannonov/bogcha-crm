import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { VueCookies } from 'vue-cookies'
import {vMaska} from "maska"


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.directive("maska", vMaska)
app.use(ElementPlus)
app.use(VueCookies, {expires: '1d'})
app.use(createPinia())
app.use(router)


app.mount('#app')
