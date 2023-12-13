<script setup lang="ts">
import type { useCalcState } from '@/composables/calc';
import type { ICleaningCoefficient } from '@/types/api/pricelist';
import type { CalcCategoryItem } from '@/types/calc';
import { ref, watch } from 'vue';

const cleaningTypeByKey: CalcCategoryItem<'cleaningCoefficient'> = {
  basic: { selected: false, tip: '' },
  accurate: { selected: false, tip: '' },
};

const { calc } = defineProps<{
  calc: ReturnType<typeof useCalcState>;
  enabled: boolean;
}>();

// const initialCleaningType =
const cleaningType = ref<keyof ICleaningCoefficient>('basic');

watch(cleaningType, (cleaning) => {
  calc.send('SET_CLEANING_TYPE', { key: cleaning });
});

watch(
  () => calc.state.value.value,
  () => {
    // reset cleaning type on selected building type changed
    cleaningType.value = 'basic';
  }
);
</script>

<template>
  <div id="cleaningType">
    <v-sheet
      :color="enabled ? '' : 'disabled'"
      rounded
      class="calc-title mt-5 mb-3"
    >
      <h3>{{ $t('calc.subtitle.cleaning') }}</h3>
    </v-sheet>

    <v-radio-group v-if="enabled" v-model="cleaningType" inline hide-details>
      <v-radio
        v-for="(cleaningType, cleaningTypeKey) of cleaningTypeByKey"
        :key="`cleaning-${cleaningTypeKey}`"
        class="text-no-wrap flex-0-1"
        :value="cleaningTypeKey"
      >
        <template v-slot:label>
          <div class="d-flex align-start">
            <span>{{ $t(`service.cleaning.${cleaningTypeKey}.title`) }}</span>
            <v-btn size="x-small" variant="plain" class="px-0">
              <v-icon icon="mdi:mdi-information-outline" color="info"> </v-icon>
              <v-tooltip
                activator="parent"
                location="end"
                max-width="300"
                offset="2"
                >{{ $t(`service.cleaning.${cleaningTypeKey}.tip`) }}.</v-tooltip
              >
            </v-btn>
          </div>
        </template>
      </v-radio>
    </v-radio-group>
  </div>
</template>

<style lang="scss">
.v-input__control > .v-selection-control-group--inline {
  display: flex;
  justify-content: space-around;
}
</style>
