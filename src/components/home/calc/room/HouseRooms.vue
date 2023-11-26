<script setup lang="ts">
import type { useCalcState } from '@/composables/calc';
import type { CalcCategoryItem } from '@/types/calc';
import { computed, reactive, watch } from 'vue';

const { calc } = defineProps<{
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
</script>

<template>
  <section id="houseRoomType">
    <div class="d-flex justify-space-between">
      <v-checkbox
        v-for="(roomType, roomTypeKey) of roomTypeByKey"
        :key="`room-${roomTypeKey}`"
        class="text-no-wrap flex-0-1"
        hide-details
        :label="$t(`service.room.${roomTypeKey}`)"
        :true-value="shouldAllRoomBeSelected"
        :readonly="shouldAllRoomBeSelected"
        :value="roomTypeKey"
        :model-value="roomType.selected"
      >
      </v-checkbox>
    </div>
  </section>
</template>
