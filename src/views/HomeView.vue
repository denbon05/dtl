<script setup lang="ts">
import IntroCarousel from '@/components/home/IntroCarousel.vue';
// import ServiceCards from '@/components/home/ServiceCards.vue';
</script>

<template>
  <v-container fluid class="h-100 pa-0 ma-0">
    <IntroCarousel />

    <!-- <v-lazy :options="{ threshold: 0 }" transition="fade-transition">
      <ServiceCards />
    </v-lazy> -->
  </v-container>
</template>
