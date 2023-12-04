<script setup lang="ts">
import officeImg from '@/assets/img/office.png';
import type { IDescSection } from '@/types/components/cleaning-about';
import DescriptionSection from './DescriptionSection.vue';

defineProps<{
  basics: IDescSection[];
  advanced?: IDescSection[];
  height: number;
}>();
</script>

<template>
  <v-img :src="officeImg" :height="height" cover alt="Women cleaning an office">
    <div class="w-50 d-flex flex-column mx-10 mt-12 pr-7 h-100 justify-start">
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
