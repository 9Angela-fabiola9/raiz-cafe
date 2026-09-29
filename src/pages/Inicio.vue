<script setup>
import { RouterLink } from 'vue-router';
import TarjetaProducto from '../components/TarjetaProducto.vue';
import { PRODUCTOS, BENEFICIOS } from '../datos.js';


const beneficios = BENEFICIOS;
const destacados = PRODUCTOS.filter((p) => p.destacado);
</script>

<template>
  <header class="hero">
    <span class="hero__etiqueta">Tueste artesanal</span>

    <h1>Café que nace en casa</h1>

    <p>
      Granos de altura seleccionados en fincas guatemaltecas y tostados cada
      semana por manos locales.
    </p>

    <RouterLink class="boton" to="/productos"> Ver productos </RouterLink>
  </header>

  <section class="contenedor seccion">
    <h2>Por qué Raíz</h2>

    <p class="seccion__intro">
      Trabajamos directo con las familias productoras, sin intermediarios.
    </p>

    <div class="rejilla">
      <article v-for="b in beneficios" :key="b.id" class="beneficio">
        <span class="beneficio__icono" aria-hidden="true">
          {{ b.icono }}
        </span>

        <h3>{{ b.titulo }}</h3>

        <p>{{ b.texto }}</p>
      </article>
    </div>
  </section>

  <section class="contenedor seccion">
    <h2>Nuestros favoritos</h2>

    <p class="seccion__intro">Los dos que más nos piden.</p>

    <div class="rejilla">
      <TarjetaProducto
        v-for="producto in destacados"
        :key="producto.id"
        :producto="producto"
      />
    </div>

    <p style="margin-top: 2rem">
      <RouterLink class="boton boton--borde" to="/productos">
        Ver todo el catálogo
      </RouterLink>
    </p>
  </section>
</template>
