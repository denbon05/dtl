<script setup lang="ts">
import introCarousel1 from '@/assets/img/intro-carousel-1.png';

const bgImages = [introCarousel1];
</script>

<template>
  <v-row justify="center" align="center"
    ><v-col>
      <v-carousel show-arrows="hover" id="introCarousel" cycle interval="8000">
        <v-carousel-item
          v-for="bgImg in bgImages"
          :key="bgImg"
          :src="bgImg"
          cover
        >
        </v-carousel-item>

        <a
          id="cta"
          class="text-h4 text-md-h2 text-deep-purple-accent-4"
          href="tel:+48576471155"
          ><v-btn
            color="primary"
            rounded="xl"
            size="x-large"
            class="px-8 text-subtitle-1"
            >{{ $t('cta.call') }}</v-btn
          >
        </a>
      </v-carousel>
    </v-col></v-row
  >
</template>

<style>
#introCarousel {
  position: relative;
}

#cta {
  position: absolute;
  top: 15%;
  left: 85%;

  transform: translate(-50%, -50%);
}
</style>
