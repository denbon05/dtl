<script setup lang="ts">
import type { IRoomType } from '@/types/api/pricelist';
import type { CalcCategoryItem } from '@/types/calc';
import { reactive, watch } from 'vue';

const props = defineProps<{
  enabled: boolean;
  allRoomAreSelected: boolean;
}>();

const roomTypeByKey = reactive<CalcCategoryItem<'roomType'>>({
  bathroom: { selected: props.allRoomAreSelected || false },
  room: { selected: props.allRoomAreSelected || false },
  kitchen: { selected: props.allRoomAreSelected || false },
});

const emit = defineEmits<{
  (e: 'select', key: keyof IRoomType): void;
}>();

watch(
  () => props.allRoomAreSelected,
  (areSelected) => {
    console.log('areSelected', areSelected);
    if (areSelected) {
      (Object.keys(roomTypeByKey) as (keyof typeof roomTypeByKey)[]).forEach(
        (key) => {
          roomTypeByKey[key].selected = true;
          emit('select', key);
        }
      );
      return;
    }

    // unselect all when cleaning type is changed to 'accurate'
    (Object.keys(roomTypeByKey) as (keyof typeof roomTypeByKey)[]).forEach(
      (key) => {
        if (roomTypeByKey[key].selected) {
          emit('select', key);
        }
        roomTypeByKey[key].selected = false;
      }
    );
  }
);

const selectRoomType = (key: keyof IRoomType) => {
  emit('select', key);
};
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

    <div v-if="enabled" class="d-flex justify-space-between">
      <v-checkbox
        v-for="(roomType, roomTypeKey) of roomTypeByKey"
        :key="`room-${roomTypeKey}`"
        class="text-no-wrap flex-0-1"
        hide-details
        :label="$t(`service.room.${roomTypeKey}`)"
        :true-value="roomType.selected || undefined"
        :readonly="allRoomAreSelected"
        :value="roomTypeKey"
        :model-value="roomType.selected"
        @change="selectRoomType(roomTypeKey)"
      >
      </v-checkbox>
    </div>
  </section>
</template>
