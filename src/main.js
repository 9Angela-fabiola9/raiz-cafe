import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

// Importación de los estilos globales (agrega esta línea):
import './styles.css' // o import './styles.css' según corresponda

const app = createApp(App)

app.use(router)
app.mount('#app')

// Seguimiento de vistas de página para Google Analytics 4
router.afterEach((to) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: to.meta.title || document.title,
      page_location: window.location.href,
      page_path: to.fullPath
    })
  }
})