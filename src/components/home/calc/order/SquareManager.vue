<script setup lang="ts">
import type { useCalcState } from '@/composables/calc';
import type { useOrderState } from '@/composables/order';
import { computed, ref, watch } from 'vue';

const { order, calc } = defineProps<{
  order: ReturnType<typeof useOrderState>;
  calc: ReturnType<typeof useCalcState>;
}>();

const squareKey = computed(() =>
  order.state.value.value === 'officeSelected' ? 'office' : 'square'
);

const square = ref(1);
const price = computed(() => order.state.value.context.mainServicesPrice);

watch(
  () => square.value,
  (amount) => {
    if (amount >= 1000) {
      square.value = 999;
      return;
    }

    order.send('UPDATE_SQ_METERS', {
      key: calc.state.value.context.roomType,
      amount,
    });
  }
);
watch(
  () => order.state.value.value,
  () => {
    // reset square amount on changed order main state
    square.value = 1;
  }
);
watch(
  () => calc.state.value.context.roomType,
  () => {
    // reset square amount on changed calc room type state
    square.value = 1;
  }
);
</script>

<template>
  <div>
    <v-row class="d-flex align-center flex-nowrap" align="center">
      <v-col cols="6">
        <span class="text-no-wrap">{{
          $t(`calc.order.${squareKey}`)
        }}</span></v-col
      >

      <v-col cols="4" class="d-flex align-center justify-end">
        <div class="pb-2 pl-3">
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
      </v-col>

      <v-col cols="2" class="d-flex justify-end">
        <span>{{ $n(price, 'currency', { notation: 'compact' }) }}</span></v-col
      >
    </v-row>
    <v-divider insert thickness="1"></v-divider>
  </div>
</template>
