<script setup lang="ts">
import type { IServiceCoefficient } from '@/types/api/pricelist';
import type { CalcCategoryItem } from '@/types/calc';
import { reactive } from 'vue';
import BuildingTypeSection from './BuildingTypeSection.vue';

const buildingTypes = reactive<
  Required<CalcCategoryItem<'serviceCoefficient'>>
>({
  condo: { selected: false, icon: 'apartment' },
  office: {
    selected: false,
    icon: 'mdi:mdi-chair-rolling',
  },
  afterRepair: { selected: false, icon: 'construction' },
});

const emit = defineEmits<{
  (e: 'select', key: keyof IServiceCoefficient): void;
}>();

const selectBuildingType = (
  buildingTypeCoeffKey: keyof IServiceCoefficient
) => {
  // select service with traversed key
  buildingTypes[buildingTypeCoeffKey].selected = true;
  // unselect the rest
  (Object.keys(buildingTypes) as (keyof typeof buildingTypes)[])
    .filter((key) => key !== buildingTypeCoeffKey)
    .forEach((key) => {
      buildingTypes[key].selected = false;
    });
  emit('select', buildingTypeCoeffKey);
};
</script>

<template>
  <div id="buildingType">
    <v-sheet rounded class="calc-title">
      <h3>{{ $t('calc.subtitle.service') }}</h3>
    </v-sheet>

    <div
      id="buildingTypeSection"
      class="d-flex mt-5 mb-3 justify-space-between"
    >
      <BuildingTypeSection
        v-for="(buildingType, buildingTypeKey) of buildingTypes"
        :key="`building-type-${buildingTypeKey}`"
        v-model="buildingType.selected"
        @select="selectBuildingType(buildingTypeKey)"
        :icon="buildingType.icon!"
      >
        {{ $t(`service.building.${buildingTypeKey}`) }}
      </BuildingTypeSection>
    </div>
  </div>
</template>

<style scoped>
#buildingTypeSection {
  gap: 5%;
}
</style>
