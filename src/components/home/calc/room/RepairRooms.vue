<script setup lang="ts">
import type { useCalcState } from '@/composables/calc';
import type { ISquarePrice } from '@/types/api/pricelist';
import { watch } from 'vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const roomKeys: (keyof ISquarePrice['repair'])[] = ['empty', 'withFurniture'];

const { calc } = defineProps<{
  calc: ReturnType<typeof useCalcState>;
}>();

const rooms = computed(() => {
  return roomKeys.map((key) => {
    return {
      key,
      title: t(`service.room.${key}`),
    };
  });
});

const room = ref<keyof ISquarePrice['repair']>('empty');

watch(room, (afterRepairRoomType) => {
  calc.send('ALTER_ROOM_TYPE', { key: afterRepairRoomType });
});
</script>

<template>
  <v-radio-group v-model="room" inline hide-details>
    <v-radio
      v-for="room of rooms"
      :key="`after-repair-room-type-${room.key}`"
      :label="room.title"
      :value="room.key"
      class="text-no-wrap flex-0-1"
    ></v-radio>
  </v-radio-group>
</template>
