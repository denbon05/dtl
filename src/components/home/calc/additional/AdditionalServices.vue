<script setup lang="ts">
import type { useCalcState } from '@/composables/calc';
import { usePriceList } from '@/composables/pricelist';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { calc } = defineProps<{
  enabled: boolean;
  calc: ReturnType<typeof useCalcState>;
}>();

const {
  pricelistByKey: { additionalService },
} = usePriceList();
const { t } = useI18n();

// prepare items to show them 3 in a row
const groupedServicesByRow = computed(() => {
  const items = Object.keys(additionalService).map((key) => {
    const { title = t(`service.additionalService.${key}`) } =
      additionalService[key];
    return {
      key,
      title,
      selected: false,
    };
  });
  const itemsNumInRow = 3;
  const groupedByRowItems: (typeof items)[] = [];
  for (let i = 0; i < items.length; i += itemsNumInRow) {
    groupedByRowItems.push(items.slice(i, i + itemsNumInRow));
  }

  return groupedByRowItems;
});

const selectedServices = ref<string[]>([]);

defineExpose({
  resetSelected: () => (selectedServices.value = []),
});

watch(
  () => selectedServices,
  (nextSelected) => {
    calc.send('UPDATE_ADDITIONAL_SERVICES', { services: nextSelected.value });
  },
  { deep: true }
);
</script>

<template>
  <div>
    <v-sheet
      :color="enabled ? '' : 'disabled'"
      rounded
      class="calc-title mt-5 mb-3"
    >
      <h3>{{ $t('calc.subtitle.room') }}</h3>
    </v-sheet>

    <div v-if="enabled">
      <v-row
        v-for="(groupedServices, groupedIdx) of groupedServicesByRow"
        :key="`grouped-service-${groupedIdx}`"
        align="baseline"
        class="ma-0 pa-0"
      >
        <v-col
          cols="4"
          class="pa-0 ma-0"
          v-for="service of groupedServices"
          :key="`extra-service-${service.key}`"
        >
          <v-checkbox
            :label="service.title"
            density="compact"
            v-model="selectedServices"
            :value="service.key"
            hide-details
            class="text-no-wrap text-body-2 text-start"
          >
          </v-checkbox>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
