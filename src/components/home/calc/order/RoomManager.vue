<script setup lang="ts">
import type { useOrderState } from '@/composables/order';
import { usePriceList } from '@/composables/pricelist';
import type { IRoomType } from '@/types/api/pricelist';
import { computed, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const roomTypeKeys: (keyof IRoomType)[] = ['bathroom', 'room'];
const { t } = useI18n();
const pricelist = usePriceList();

const { order } = defineProps<{
  order: ReturnType<typeof useOrderState>;
}>();

const roomAmountByKey = reactive<Record<keyof IRoomType, number>>({
  // initial values
  bathroom: 1,
  kitchen: 1,
  room: 1,
});

const changeRoomAmount = (key: keyof IRoomType, shouldIncrease = true) => {
  roomAmountByKey[key] = roomAmountByKey[key] + (shouldIncrease ? 1 : -1);
  // compute the price
  order.send('ALTER_ROOM_BY_KEY', { key, shouldIncrease });
};

watch(
  () => order.state.value.context.cleaningType,
  () => {
    // toggle the cleaning type resets visible rooms amount
    (Object.keys(roomAmountByKey) as (keyof IRoomType)[]).forEach((key) => {
      roomAmountByKey[key] = 1;
    });
  }
);

const cleaningTitle = computed(() => {
  const { cleaningType } = order.state.value.context;
  // if cleaning type is selected show it in oder case show default title
  return cleaningType
    ? t(`service.cleaning.${cleaningType}`)
    : t('calc.order.cleaning');
});
</script>

<template>
  <section id="oderRoomManger">
    <h4 class="text-subtitle-1 d-flex justify-space-between">
      <span>{{ cleaningTitle }}</span>
      <span v-if="order.state.value.context.cleaningType === 'accurate'"
        >x{{ pricelist.pricelistByKey.cleaningCoefficient.accurate }}</span
      >
    </h4>
    <div class="d-flex flex-column">
      <div class="d-flex justify-space-around">
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
                @click="changeRoomAmount(roomTypeKey, false)"
              >
              </v-btn>
              <span class="px-2">{{ roomAmountByKey[roomTypeKey] }}</span>
              <v-btn
                icon="mdi:mdi-plus"
                variant="plain"
                size="small"
                density="compact"
                @click="changeRoomAmount(roomTypeKey)"
              >
              </v-btn>
            </div>
          </v-list>
        </template>
      </div>
      <v-divider insert thickness="1"></v-divider>
    </div>
  </section>
</template>
