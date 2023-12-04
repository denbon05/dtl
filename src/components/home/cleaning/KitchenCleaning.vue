<script setup lang="ts">
import kitchenImg from '@/assets/img/kitchen.png';
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
    :src="kitchenImg"
    :height="height"
    cover
    alt="Woman cleaning a kitchen"
  >
    <div class="w-50 h-100 d-flex flex-column mx-10 pr-7 justify-space-around">
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
