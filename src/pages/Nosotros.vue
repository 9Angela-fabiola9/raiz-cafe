<script setup>
import { EQUIPO } from '../datos.js';

const equipo = EQUIPO;
</script>

<template>
  <div class="contenedor seccion">
    <h2>Nuestra historia</h2>
    <p class="seccion__intro">
      Raíz nació en 2023 en una cocina de la zona 1, tostando dos libras de café
      a la semana para los vecinos.
    </p>

    <p>
      Hoy trabajamos con seis familias productoras en Huehuetenango, Antigua y
      Cobán. Compramos su cosecha a un precio por encima del mercado y la
      tostamos aquí mismo, en lotes pequeños, para que llegue fresca.
    </p>

    <p>
      No somos una cadena ni queremos serlo. Nos importa que sepas de dónde
      viene lo que tomas y quién lo cultivó.
    </p>

    <h2 style="margin-top: 3rem">El equipo</h2>

    <div class="rejilla">
      <article v-for="persona in equipo" :key="persona.id" class="miembro">
        <div class="miembro__avatar" aria-hidden="true">
          {{ persona.inicial }}
        </div>
        <h3>{{ persona.nombre }}</h3>
        <p>{{ persona.rol }}</p>
      </article>
    </div>
  </div>
</template>
