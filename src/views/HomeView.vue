<script setup lang="ts">
import IntroCarousel from '@/components/home/IntroCarousel.vue';
import ServicesCalc from '@/components/home/calc/ServicesCalc.vue';
import AboutCleaning from '@/components/home/cleaning/AboutCleaning.vue';
import OrderSteps from '@/components/home/order/OrderSteps.vue';
import AboutPrice from '@/components/home/pricelist/AboutPrice.vue';
import CleaningTips from '@/components/home/tips/CleaningTips.vue';
</script>

<template>
  <v-container fluid class="h-100 pa-0 ma-0">
    <IntroCarousel />

    <ServicesCalc />
    <AboutCleaning id="cleaning" />
    <AboutPrice id="pricelist" class="my-6" />
    <OrderSteps id="order" class="my-6" />
    <CleaningTips class="my-6" />
  </v-container>
</template>
