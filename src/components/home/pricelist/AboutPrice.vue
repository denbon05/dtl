<script setup lang="ts">
import ServicePrices from './ServicePrices.vue';
</script>

<template>
  <v-row justify="center">
    <v-col cols="11" lg="9" xl="8" class="d-flex flex-column">
      <h1 class="text-center mt-6 font-weight-medium">
        {{ $t('price.title') }}
      </h1>
      <h5 class="text-h6 pl-12 my-12">{{ $t('price.desc') }}</h5>

      <service-prices></service-prices>
    </v-col>
  </v-row>
</template>
