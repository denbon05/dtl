<script setup lang="ts">
import type { ICleaningCoefficient } from '@/types/api/pricelist';
import type { CalcCategoryItem } from '@/types/calc';

const cleaningTypeByKey: CalcCategoryItem<'cleaningCoefficient'> = {
  basic: { selected: false },
  accurate: { selected: false },
};

const emit = defineEmits<{
  (e: 'select', key: keyof ICleaningCoefficient): void;
}>();

const selectCleaningType = (cleaningKey: keyof ICleaningCoefficient) => {
  emit('select', cleaningKey);
};
</script>

<template>
  <div id="cleaningType">
    <v-sheet rounded class="calc-title mt-5 mb-3">
      <h3>{{ $t('calc.subtitle.cleaning') }}</h3>
    </v-sheet>

    <v-radio-group @update:modelValue="selectCleaningType" inline hide-details>
      <v-radio
        v-for="(cleaningType, cleaningTypeKey) of cleaningTypeByKey"
        :key="`cleaning-${cleaningTypeKey}`"
        class="text-no-wrap flex-0-1"
        :label="$t(`service.cleaning.${cleaningTypeKey}`)"
        :value="cleaningTypeKey"
      >
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
