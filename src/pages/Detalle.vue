<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { PRODUCTOS } from '../datos.js';

// El :id de la URL llega aquí como prop
// gracias a "props: true" que pusiste en router.js
const props = defineProps({
  id: { type: String, required: true },
});

const producto = computed(() =>
  PRODUCTOS.find((p) => p.id === Number(props.id))
);
</script>

<template>
  <div v-if="producto" class="contenedor seccion">
    <RouterLink class="volver" to="/productos">← Volver al catálogo</RouterLink>

    <div class="detalle">
      <div class="detalle__imagen" aria-hidden="true">{{ producto.emoji }}</div>

      <div>
        <span class="tarjeta__categoria">{{ producto.categoria }}</span>
        <h1>{{ producto.nombre }}</h1>
        <p>{{ producto.descripcion }}</p>

        <template v-if="producto.notas.length > 0">
          <h3>Notas de sabor</h3>
          <ul class="notas">
            <li v-for="nota in producto.notas" :key="nota">{{ nota }}</li>
          </ul>
        </template>

        <p class="detalle__precio">Q{{ producto.precio }}</p>

        <RouterLink class="boton" to="/contacto"
          >Pedir este producto</RouterLink
        >
      </div>
    </div>
  </div>

  <div v-else class="contenedor seccion vacio">
    <h2>Producto no encontrado</h2>
    <p>El producto con el código {{ id }} no está en nuestro catálogo.</p>
    <RouterLink class="boton" to="/productos">Ver el catálogo</RouterLink>
  </div>
</template>
