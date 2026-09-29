<script setup>
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <div class="layout">
    <NavBar />

    <main>
      <RouterView />
    </main>

    <SiteFooter />
  </div>
</template>