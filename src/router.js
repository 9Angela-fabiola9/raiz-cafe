import { createRouter, createWebHistory } from 'vue-router'

// Asegúrate de que las rutas coincidan con la estructura de tus componentes en src/pages/
const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: () => import('./pages/Inicio.vue'),
    meta: {
      title: 'Raíz Café de Origen · Café Guatemalteco de Especialidad',
      description: 'Granos de altura seleccionados en fincas guatemaltecas y tostados semanalmente por manos locales.'
    }
  },
  {
    path: '/productos',
    name: 'Productos',
    component: () => import('./pages/Productos.vue'),
    meta: {
      title: 'Catálogo de Cafés de Especialidad · Raíz Café',
      description: 'Explora nuestras selecciones de origen: Huehuetenango, Antigua y Cobán recién tostados.'
    }
  },
  {
    path: '/nosotros',
    name: 'Nosotros',
    component: () => import('./pages/Nosotros.vue'),
    meta: {
      title: 'Sobre Nosotros · Raíz Café de Origen',
      description: 'Conoce nuestra historia y la alianza directa con familias productoras sin intermediarios.'
    }
  },
  {
    path: '/contacto',
    name: 'Contacto',
    component: () => import('./pages/Contacto.vue'),
    meta: {
      title: 'Contacto y Mayoreo · Raíz Café de Origen',
      description: 'Ponte en contacto con nuestro equipo para pedidos especiales, mayoreo o consultas.'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guarda de navegación para cambiar el <title> y la <meta name="description"> al cambiar de ruta
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  let metaDescription = document.querySelector('meta[name="description"]')
  if (to.meta.description) {
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content = to.meta.description
  }

  next()
})

export default router