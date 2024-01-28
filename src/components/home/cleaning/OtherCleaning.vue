<script setup lang="ts">
import otherImg from '@/assets/img/other-cleaning.webp';
import DescriptionSection from './DescriptionSection.vue';
import type { IDescSection } from '@/types/components/cleaning-about';

defineProps<{
  basics: IDescSection[];
  height: number;
}>();
</script>

<template>
  <v-img
    :src="otherImg"
    :height="height"
    cover
    :alt="$t('alt.img.otherCleaing')"
  >
    <div class="w-50 d-flex flex-column mx-10 mt-12 pr-7 h-100 justify-start">
      <DescriptionSection :items="basics"> </DescriptionSection>
    </div>
  </v-img>
</template>

<style lang="scss" scoped></style>
