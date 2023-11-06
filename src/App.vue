<script setup lang="ts">
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <v-app>
    <v-app-bar>
      <template #prepend><h3>DTL</h3></template>
    </v-app-bar>

    <v-main> <RouterView /> </v-main>

    <AppFooter />
  </v-app>
</template>

<style></style>
