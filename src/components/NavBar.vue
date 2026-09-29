<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { ENLACES } from '../datos.js';

const enlaces = ENLACES;
const route = useRoute();

function esActivo(ruta) {
  if (ruta === '/') {
    return route.path === '/';
  }

  return route.path.startsWith(ruta);
}
</script>

<template>
  <nav class="navbar">
    <RouterLink to="/" class="navbar__marca"> 🌱 Raíz </RouterLink>

    <ul class="navbar__links">
      <li v-for="enlace in enlaces" :key="enlace.id">
        <RouterLink
          :to="enlace.ruta"
          :class="{ activo: esActivo(enlace.ruta) }"
        >
          {{ enlace.texto }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
