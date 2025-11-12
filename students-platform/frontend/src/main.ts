import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import './style.css'

// 1. Import Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // 2. Import the CSS

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(ElementPlus) // 3. Tell Vue to use it

app.mount('#app')