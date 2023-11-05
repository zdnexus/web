import { createSSRApp } from 'vue'

import './uni.scss'
// import './style.scss'
import App from './App.vue'

import home from './img/home.png'
import complate from './img/complate.png'
import list from './img/list.png'
import user from './img/user.png'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
