<script setup lang="ts">
import windowImg from '@/assets/img/window.webp';
import type { IDescSection } from '@/types/components/cleaning-about';
import DescriptionSection from './DescriptionSection.vue';
import { computed } from 'vue';
import { usePriceList } from '@/composables/pricelist';
import { useI18n } from 'vue-i18n';

const { basics } = defineProps<{
  basics: IDescSection[];
  height: number;
}>();

const { n } = useI18n();

const pricelist = usePriceList();

const basicsWithPrice = computed<IDescSection[]>(() => {
  // the order of basic items must be the same as from the price list
  const prices = [
    pricelist.pricelistByKey.window.singleLeafWindow,
    pricelist.pricelistByKey.window.doubleLeafWindow,
    pricelist.pricelistByKey.window.singleLeafBalconyDoor,
    pricelist.pricelistByKey.window.doubleLeafBalconyDoor,
    pricelist.pricelistByKey.window.roofWindow,
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
  <v-img
    :src="windowImg"
    :height="height"
    cover
    :alt="$t('alt.img.windowCleaning')"
  >
    <div class="w-50 d-flex flex-column mx-7 my-15 pr-7">
      <DescriptionSection :items="basicsWithPrice"> </DescriptionSection>
    </div>
  </v-img>
</template>
