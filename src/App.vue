<script setup lang="ts">
import AppBar from './components/common/AppBar.vue';
import AppFooter from './components/common/AppFooter.vue';
</script>

<template>
  <v-app>
    <AppBar />

    <v-main> <RouterView /> </v-main>

    <AppFooter />
  </v-app>
</template>

<style lang="scss">
.w-45 {
  width: 45%;
}
</style>
