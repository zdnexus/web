import { createSSRApp } from 'vue'

import './uni.scss'
// import './style.scss'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
