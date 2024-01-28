<script setup lang="ts">
import roomImg from '@/assets/img/room.webp';
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
    :src="roomImg"
    :height="height"
    cover
    :alt="$t('alt.img.roomCleaning')"
  >
    <div
      class="w-50 d-flex flex-column ma-10 pl-2 pr-7 h-75 justify-space-around"
    >
      <DescriptionSection :items="basics">
        <template #title>{{ $t('cleaning.services.header.basic') }}</template>
      </DescriptionSection>

      <DescriptionSection v-if="advanced" :items="advanced">
        <template #title>{{
          $t('cleaning.services.header.accurate')
        }}</template>
      </DescriptionSection>
    </div>
  </v-img>
</template>
