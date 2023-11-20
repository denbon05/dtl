<script setup lang="ts">
import type { IRoomType } from '@/types/api/pricelist';

defineProps<{
  roomTypeKeys: (keyof IRoomType)[];
  roomAmountByKey: Record<keyof IRoomType, number>;
}>();
defineEmits<{
  (
    e: 'changeRoomAmount',
    payload: keyof IRoomType,
    shouldIncrease?: boolean
  ): void;
}>();
</script>

<template>
  <div class="d-flex flex-column">
    <template v-for="roomTypeKey in roomTypeKeys" :key="roomTypeKey">
      <v-list class="pl-0 ml-0 d-flex justify-space-between flex-nowrap">
        <div class="flex-1-0">{{ $t(`service.room.${roomTypeKey}`) }}</div>
        <div class="flex-1 mx-4">
          <!-- Increase/decrease room amount -->
          <v-btn
            icon="mdi:mdi-minus"
            variant="plain"
            size="small"
            density="compact"
            :disabled="roomAmountByKey[roomTypeKey] <= 1"
            @click="$emit('changeRoomAmount', roomTypeKey, false)"
          >
          </v-btn>
          <span class="px-2">{{ roomAmountByKey[roomTypeKey] }}</span>
          <v-btn
            icon="mdi:mdi-plus"
            variant="plain"
            size="small"
            density="compact"
            @click="$emit('changeRoomAmount', roomTypeKey)"
          >
          </v-btn>
        </div>
      </v-list>
      <v-divider insert thickness="1"></v-divider>
    </template>
  </div>
</template>
