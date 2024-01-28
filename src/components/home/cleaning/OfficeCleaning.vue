<script setup lang="ts">
import officeImg from '@/assets/img/office.webp';
import type { IDescSection } from '@/types/components/cleaning-about';
import DescriptionSection from './DescriptionSection.vue';

defineProps<{
  basics: IDescSection[];
  height: number;
}>();
</script>

<template>
  <v-img
    :src="officeImg"
    :height="height"
    cover
    :alt="$t('alt.img.officeCleaning')"
  >
    <div class="w-50 d-flex flex-column mx-10 mt-12 pr-7 h-100 justify-start">
      <DescriptionSection :items="basics"> </DescriptionSection>
    </div>
  </v-img>
</template>
