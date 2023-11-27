<script setup lang="ts">
import officeImg from '@/assets/img/office.png';
import type { IDescSection } from '@/types/components/cleaning-about';
import DescriptionSection from './DescriptionSection.vue';

defineProps<{
  basics: IDescSection[];
  advanced?: IDescSection[];
}>();
</script>

<template>
  <v-img :src="officeImg">
    <div
      class="w-33 d-flex flex-column ma-15 pl-2 pr-7 h-75 justify-space-between"
    >
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
