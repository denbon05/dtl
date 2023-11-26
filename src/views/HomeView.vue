<script setup lang="ts">
import IntroCarousel from '@/components/home/IntroCarousel.vue';
// import ServiceCards from '@/components/home/ServiceCards.vue';
import ServicesCalc from '@/components/home/calc/ServicesCalc.vue';
</script>

<template>
  <v-lazy :options="{ threshold: 0 }" transition="fade-transition">
    <v-container fluid class="h-100 pa-0 ma-0">
      <IntroCarousel />

      <!-- <ServiceCards /> -->
      <ServicesCalc />
    </v-container>
  </v-lazy>
</template>
