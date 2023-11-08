<script setup lang="ts">
const bgImages = [
  'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
  'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
  'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
  'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
];
</script>

<template>
  <v-row justify="center" align="center"
    ><v-col>
      <v-carousel show-arrows="hover" id="introCarousel" cycle interval="4000">
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
        >
          <v-icon size="small">mdi-phone</v-icon>
          Zadzwoń</a
        >
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
  top: 65%;
  left: 65%;

  transform: translate(-50%, -50%);
}
</style>
