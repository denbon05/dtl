<script setup lang="ts">
import type { IBuildingCoefficient } from '@/types/api/pricelist';
import type { CalcCategoryItem } from '@/types/calc';
import { reactive } from 'vue';
import BuildingTypeSection from './BuildingTypeSection.vue';

const buildingTypes = reactive<
  Required<CalcCategoryItem<'buildingCoefficient'>>
>({
  condo: { selected: false, title: 'Sprzątanie mieszkania', icon: 'apartment' },
  house: { selected: false, title: 'Sprzątanie budynku', icon: 'house' },
  office: {
    selected: false,
    title: 'Sprzątanie biura',
    icon: 'mdi:mdi-chair-rolling',
  },
});

const emit = defineEmits<{
  (e: 'select', key: keyof IBuildingCoefficient): void;
}>();

const selectBuildingType = (
  buildingTypeCoeffKey: keyof IBuildingCoefficient
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
        {{ buildingType.title }}
      </BuildingTypeSection>
    </div>
  </div>
</template>

<style scoped>
#buildingTypeSection {
  gap: 5%;
}
</style>
