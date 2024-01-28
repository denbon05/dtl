<script setup lang="ts">
import bathroomImg from '@/assets/img/bathroom.webp';
import type { IDescSection } from '@/types/components/cleaning-about';
import DescriptionSection from './DescriptionSection.vue';

defineProps<{
  basics: IDescSection[];
  advanced?: IDescSection[];
  height: number;
}>();
</script>

<template>
  <v-img
    :src="bathroomImg"
    :height="height"
    cover
    :alt="$t('alt.img.bathroomCleaning')"
  >
    <div class="w-50 h-100 d-flex flex-column mx-10 pr-6 justify-space-around">
      <DescriptionSection :items="basics">
        <template #title>{{ $t('cleaning.services.header.basic') }}</template>
      </DescriptionSection>

      <DescriptionSection v-if="advanced?.length" :items="advanced">
        <template #title>{{
          $t('cleaning.services.header.accurate')
        }}</template>
      </DescriptionSection>
    </div>
  </v-img>
</template>
