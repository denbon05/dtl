<script setup lang="ts">
import windowImg from '@/assets/img/window.png';
import type { IDescSection } from '@/types/components/cleaning-about';
import DescriptionSection from './DescriptionSection.vue';
import { computed } from 'vue';
import { usePriceList } from '@/composables/pricelist';
import { useI18n } from 'vue-i18n';

const { basics } = defineProps<{
  basics: IDescSection[];
  advanced?: IDescSection[];
  height: number;
}>();

const { n } = useI18n();

const {
  pricelistByKey: { window: glass },
} = usePriceList();

const basicsWithPrice = computed<IDescSection[]>(() => {
  // the order of basic items must be the same as from the price list
  const prices = [
    glass.singleLeafWindow,
    glass.doubleLeafWindow,
    glass.singleLeafBalconyDoor,
    glass.doubleLeafBalconyDoor,
    glass.roofWindow,
  ];
  return basics.map<IDescSection>((item, idx) => {
    const { title } = item;
    const price = prices[idx];

    if (!price) {
      // means there is no price for the title
      return {
        ...item,
        title: `${title}.`,
      };
    }

    return {
      ...item,
      // @ts-ignore
      title: `${title}, ${n(price, 'currency', {
        notation: 'compact',
      })}.`,
    };
  });
});
</script>

<template>
  <v-img :src="windowImg" :height="height" cover alt="Woman cleaning a window">
    <div class="w-50 d-flex flex-column mx-7 my-15 pr-7">
      <DescriptionSection :items="basicsWithPrice">
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
