<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  producto: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <RouterLink :to="`/productos/${producto.id}`" class="tarjeta">
    <span class="tarjeta__emoji" aria-hidden="true">
      {{ producto.emoji }}
    </span>

    <span class="tarjeta__categoria">
      {{ producto.categoria }}
    </span>

    <h3>{{ producto.nombre }}</h3>

    <p>{{ producto.resumen }}</p>

    <span class="tarjeta__precio"> Q{{ producto.precio }} </span>
  </RouterLink>
</template>
