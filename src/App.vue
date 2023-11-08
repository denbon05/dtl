<script setup lang="ts">
import AppBar from './components/common/AppBar.vue';
import AppFooter from './components/common/AppFooter.vue';
</script>

<template>
  <v-layout>
    <v-app>
      <AppBar />

      <v-main> <RouterView /> </v-main>

      <AppFooter />
    </v-app>
  </v-layout>
</template>

<style></style>
