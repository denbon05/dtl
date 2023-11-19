<script setup lang="ts">
import type { IRoomType } from '@/types/api/pricelist';
import type { CalcCategoryItem } from '@/types/calc';
import { reactive } from 'vue';

const roomTypeByKey = reactive<CalcCategoryItem<'roomType'>>({
  bathroom: { selected: false, title: 'Łazienka' },
  room: { selected: false, title: 'Pokój' },
  kitchen: { selected: false, title: 'Kuchnia' },
});

const emit = defineEmits<{
  (e: 'select', key: keyof IRoomType): void;
}>();

const selectRoomType = (key: keyof IRoomType) => {
  emit('select', key);
};
</script>

<template>
  <section id="roomType">
    <v-sheet rounded class="calc-title mt-5 mb-3">
      <h3>{{ $t('calc.subtitle.room') }}</h3>
    </v-sheet>

    <div class="d-flex justify-space-between">
      <v-checkbox
        v-for="(roomType, roomTypeKey) of roomTypeByKey"
        :key="`room-${roomTypeKey}`"
        class="text-no-wrap flex-0-1"
        hide-details
        :label="roomType.title"
        :value="roomTypeKey"
        v-model="roomType.selected"
        @click="selectRoomType(roomTypeKey)"
      >
      </v-checkbox>
    </div>
  </section>
</template>

<!-- <style lang="scss" scoped>
.v-input,
.v-checkbox,
.v-input__control {
  width: fit-content;
}
</style> -->
