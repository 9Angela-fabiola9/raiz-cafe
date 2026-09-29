<script setup>
import { ref, computed } from 'vue';
import TarjetaProducto from '../components/TarjetaProducto.vue';
import { PRODUCTOS, CATEGORIAS } from '../datos.js';

const categorias = CATEGORIAS;

// La categoría seleccionada
const categoria = ref('Todos');

// Los productos que se muestran según la categoría
const visibles = computed(() =>
  categoria.value === 'Todos'
    ? PRODUCTOS
    : PRODUCTOS.filter((p) => p.categoria === categoria.value)
);
</script>

<template>
<div class="contenedor seccion">
<h2>Nuestro catálogo</h2>
<p class="seccion__intro">
  {{ visibles.length }}
  {{ visibles.length === 1 ? 'producto disponible' : 'productos disponibles' }}.
</p>

<div class="filtros">
  <button
    v-for="cat in categorias"
    :key="cat"
    type="button"
    class="filtro"
    :class="{ activo: cat === categoria }"
    @click="categoria = cat"
  >
    {{ cat }}
  </button>
</div>

<div v-if="visibles.length > 0" class="rejilla">
  <TarjetaProducto
    v-for="producto in visibles"
    :key="producto.id"
    :producto="producto"
  />
</div>

<p v-else class="vacio">No hay productos en esta categoría.</p>
</div>
</template>
