<script setup>
import { onMounted } from 'vue';
import { useClima } from '../composables/useClima.js';

const { datos, cargando, error, obtenerClima } = useClima();

onMounted(() => {
  obtenerClima();
});




const descripcionClima = (codigo) => {
  if (codigo === 0) return 'Despejado';
  if (codigo <= 3) return 'Parcialmente nublado';
  if (codigo <= 48) return 'Nublado';
  if (codigo <= 67) return 'Lluvia';
  if (codigo <= 77) return 'Nieve';
  if (codigo <= 82) return 'Lluvias';
  return 'Clima variable';
};
</script>

<template>
  <section class="contenedor seccion">
    <h2>El clima en Guatemala</h2>

    <p class="seccion__intro">
      Una taza de café siempre combina bien con el clima del día.
    </p>

    <!-- ESTADO: CARGANDO -->
    <div v-if="cargando">
      <p>☕ Consultando el clima...</p>
    </div>

    <!-- ESTADO: ERROR -->
    <div v-else-if="error">
      <p>{{ error }}</p>
      <button class="boton" @click="obtenerClima">
        Intentar de nuevo
      </button>
    </div>

    <!-- ESTADO: VACÍO -->
    <div v-else-if="!datos || !datos.current">
      <p>No hay información del clima disponible.</p>
    </div>

    <!-- ESTADO: ÉXITO -->
    <div v-else class="rejilla">
      <article class="beneficio">
        <span class="beneficio__icono">🌡️</span>

        <h3>{{ datos.current.temperature_2m }} °C</h3>

        <p>
          {{ descripcionClima(datos.current.weather_code) }}
        </p>

        <p>
          Humedad: {{ datos.current.relative_humidity_2m }}%
        </p>
      </article>
    </div>
  </section>
</template>