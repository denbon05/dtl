<script setup lang="ts">
import { usePriceList } from '@/composables/pricelist';
import type { ISquarePrice } from '@/types/api/pricelist';
import { computed, ref } from 'vue';

const props = defineProps<{ isEmptyRoom: boolean }>();
const {
  pricelistByKey: { square: squarePriceByKey },
} = usePriceList();
const squareKey = computed<keyof ISquarePrice>(() =>
  props.isEmptyRoom ? 'emptyRoom' : 'roomAfterRepair'
);

const square = ref(1);
const price = computed(() => squarePriceByKey[squareKey.value] * square.value);
</script>

<template>
  <div>
    <div class="d-flex align-center flex-nowrap">
      <span class="text-no-wrap">{{ $t(`calc.order.${squareKey}`) }}</span>

      <v-spacer></v-spacer>

      <div class="pb-2 flex-shrink-1 w-25 pl-10">
        <v-text-field
          density="compact"
          variant="underlined"
          flat
          hide-spin-buttons
          v-model="square"
          single-line
          min="1"
          max="999"
          hide-details
          type="number"
        ></v-text-field>
      </div>
      <span class="ml-1 mr-4">m²</span>
      <span>{{ $n(price, 'currency', { notation: 'compact' }) }}</span>
    </div>
    <v-divider insert thickness="1"></v-divider>
  </div>
</template>
