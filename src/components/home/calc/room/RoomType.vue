<script setup lang="ts">
import type { useCalcState } from '@/composables/calc';
import type { CalcCategoryItem } from '@/types/calc';
import { computed, reactive, watch } from 'vue';
import HouseRooms from './HouseRooms.vue';
import RepairRooms from './RepairRooms.vue';

const { enabled, calc } = defineProps<{
  enabled: boolean;
  calc: ReturnType<typeof useCalcState>;
}>();

const shouldAllRoomBeSelected = computed(
  () => calc.state.value.context.shouldAllRoomsBeSelected
);

const roomTypeByKey = reactive<CalcCategoryItem<'roomType'>>({
  bathroom: { selected: shouldAllRoomBeSelected.value || false },
  room: { selected: shouldAllRoomBeSelected.value || false },
  kitchen: { selected: shouldAllRoomBeSelected.value || false },
});

watch(
  () => shouldAllRoomBeSelected.value,
  (areSelected) => {
    if (areSelected) {
      (Object.keys(roomTypeByKey) as (keyof typeof roomTypeByKey)[]).forEach(
        (key) => {
          // select all the rooms
          roomTypeByKey[key].selected = true;
        }
      );
      return;
    }

    // unselect all
    (Object.keys(roomTypeByKey) as (keyof typeof roomTypeByKey)[]).forEach(
      (key) => {
        roomTypeByKey[key].selected = false;
      }
    );
  }
);

const roomsComponent = computed(() => {
  const { value: selectedBuildingService } = calc.state.value;

  if (selectedBuildingService === 'afterRepairSelected') {
    return RepairRooms;
  }
  return HouseRooms;
});
</script>

<template>
  <section id="roomType">
    <v-sheet
      :color="enabled ? '' : 'disabled'"
      rounded
      class="calc-title mt-5 mb-3"
    >
      <h3>{{ $t('calc.subtitle.room') }}</h3>
    </v-sheet>

    <component v-if="enabled" :calc="calc" :is="roomsComponent"></component>
  </section>
</template>
