<script setup lang="ts">
import { usePriceList } from '@/composables/pricelist';
import type { IRoomType } from '@/types/api/pricelist';
import type { CalcSelectedOpts } from '@/types/calc';
import { capitalize, computed, reactive, toValue } from 'vue';
import { useI18n } from 'vue-i18n';
import SquareManager from './SquareManager.vue';
import RoomManager from './RoomManager.vue';

const { opts } = defineProps<{
  opts: CalcSelectedOpts;
  isSquareMode: boolean;
  shouldAdditionalServicesBeAllowed: boolean;
}>();

const { t } = useI18n();

const serviceTitle = computed(() =>
  opts.service ? t(`service.building.${opts.service}`) : t('calc.order.service')
);
const cleaningTitle = computed(() =>
  opts.cleaning
    ? t(`service.cleaning.${opts.cleaning}`)
    : t('calc.order.cleaning')
);

const { pricelistByKey, isPricelistLoading } = usePriceList();

const roomAmountByKey = reactive<Record<keyof IRoomType, number>>({
  // initial values
  bathroom: 1,
  kitchen: 1,
  room: 1,
});

const changeRoomAmount = (key: keyof IRoomType, shouldIncrease = true) => {
  roomAmountByKey[key] = roomAmountByKey[key] + (shouldIncrease ? 1 : -1);
};
const roomsPriceByRoomKey = computed<Record<keyof IRoomType, number>>(
  () =>
    new Proxy(roomAmountByKey, {
      get(target, key: keyof IRoomType) {
        const roomAmount = target[key];
        const roomPrice = pricelistByKey.roomType[key];
        return roomAmount * roomPrice;
      },
    })
);

const areRoomsSelected = computed(() => !!opts.rooms.length);

const mainServicesSumPrice = computed(() => {
  const roomTotalPrice = toValue(areRoomsSelected)
    ? opts.rooms
        .map((key) => pricelistByKey.roomType[key] * roomAmountByKey[key])
        .reduce((a, b) => a + b)
    : 0;
  return roomTotalPrice;
});
const additionalServicesSumPrice = computed(() => 0);

const totalPrice = computed(
  () => toValue(mainServicesSumPrice) + toValue(additionalServicesSumPrice)
);
</script>

<template>
  <v-sheet id="servicesOrder" border="green" rounded class="py-5 px-3">
    <section class="d-flex flex-column text-center">
      <h2 class="mb-4">{{ $t('calc.order.title') }}</h2>
      <span class="text-caption text-medium-emphasis">
        <slot name="subtitle"></slot
      ></span>

      <div class="d-flex flex-column text-start">
        <h4 class="text-subtitle-1">{{ serviceTitle }}</h4>

        <template v-if="isSquareMode">
          <SquareManager
            :is-empty-room="opts.service === 'afterRepair'"
          ></SquareManager>
        </template>
        <template v-else>
          <!-- Show room title if there are no selected ones -->
          <h4 v-if="!areRoomsSelected" class="text-subtitle-1">
            {{ $t('calc.order.room') }}
          </h4>
          <h4 class="text-subtitle-1">{{ cleaningTitle }}</h4>

          <!-- There are selected rooms - show options -->
          <RoomManager
            @change-room-amount="changeRoomAmount"
            :room-amount-by-key="roomAmountByKey"
            :room-type-keys="opts.rooms"
          ></RoomManager>
        </template>

        <h4
          class="text-subtitle-1 font-weight-bold d-flex justify-space-between mt-3"
        >
          {{ $t('calc.order.price') }}:
          <span class="font-weight-medium">{{
            $n(mainServicesSumPrice, 'currency', { notation: 'compact' })
          }}</span>
        </h4>
        <hr />
        <h4 class="my-3 text-h6 font-weight-bold">
          {{ $t('calc.order.additional') }}
        </h4>

        <!-- Show dashed line in case no additional services -->
        <hr v-if="!opts.additionalServices.length" class="border-dashed" />

        <h4 class="text-subtitle-1 mt-4">{{ $t('calc.order.sum.title') }}:</h4>
        <h4 class="text-subtitle-1">
          {{ $t('calc.order.sum.from') }}
          <span class="m font-weight-black text-body-1">
            {{ $n(totalPrice, 'currency', { notation: 'compact' }) }}
          </span>
        </h4>
      </div>

      <p class="m text-left font-italic text-subtitle-2 my-4">
        {{ $t('calc.order.info') }}
      </p>

      <a
        class="text-h4 text-md-h2 text-deep-purple-accent-4"
        href="tel:+48576471155"
        ><v-btn
          color="primary"
          rounded="xl"
          size="large"
          class="px-10 text-subtitle-1 font-weight-bold"
          >{{ $t('cta.call') }}</v-btn
        >
      </a>
    </section>
  </v-sheet>
</template>

<style lang="scss">
#servicesOrder {
  border: 0.5px solid;
  border-color: rgb(var(--v-theme-primary));
}
</style>
