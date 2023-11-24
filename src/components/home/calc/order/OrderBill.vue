<script setup lang="ts">
import { usePriceList } from '@/composables/pricelist';
import type { IRoomType } from '@/types/api/pricelist';
import type { CalcSelectedOpts } from '@/types/calc';
import { computed, reactive, toValue } from 'vue';
import { useI18n } from 'vue-i18n';
import RoomManager from './RoomManager.vue';
import SquareManager from './SquareManager.vue';
import AdditionalServices from './AdditionalServices.vue';
import { useOrderState } from '@/composables/order';
import type { useCalcState } from '@/composables/calc';
import { watch } from 'vue';

const { opts, calc } = defineProps<{
  opts: CalcSelectedOpts;
  calc: ReturnType<typeof useCalcState>;
}>();

const { pricelistByKey, isPricelistLoading } = usePriceList();
const order = useOrderState(calc, pricelistByKey);

const { t } = useI18n();

const serviceTitle = computed(() =>
  // if service type is chosen show what chosen in oder case show title
  opts.service ? t(`service.building.${opts.service}`) : t('calc.order.service')
);
const cleaningTitle = computed(() =>
  // if cleaning type is chosen show what chosen in oder case show title
  opts.cleaning
    ? t(`service.cleaning.${opts.cleaning}`)
    : t('calc.order.cleaning')
);

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

const areRoomsSelected = computed(() => !!opts.rooms.length);

watch(
  () => opts.cleaning,
  () => {
    // toggle the cleaning type resets visible rooms amount
    (Object.keys(roomAmountByKey) as (keyof IRoomType)[]).forEach((key) => {
      roomAmountByKey[key] = 1;
    });
  }
);
</script>

<template>
  <v-sheet id="servicesOrder" border="green" rounded class="py-5 px-3">
    <section class="d-flex flex-column text-center">
      <h2>{{ $t('calc.order.title') }}</h2>
      <span class="my-3 text-caption text-medium-emphasis">
        <slot name="subtitle"></slot
      ></span>

      <div class="d-flex flex-column text-start">
        <h4 class="text-subtitle-1">{{ serviceTitle }}</h4>

        <template v-if="order.state.value.tags.has('squareMode')">
          <SquareManager
            :is-empty-room="order.state.value.tags.has('afterRepair')"
          ></SquareManager>
        </template>
        <template v-else>
          <h4 class="text-subtitle-1 d-flex justify-space-between">
            <span>{{ cleaningTitle }}</span>
            <span v-if="calc.state.value.context.shouldCleaningBeAccurate"
              >x{{ pricelistByKey.cleaningCoefficient.accurate }}</span
            >
          </h4>
          <!-- There are selected rooms - show options -->
          <RoomManager
            v-if="areRoomsSelected"
            @change-room-amount="changeRoomAmount"
            :room-amount-by-key="roomAmountByKey"
          ></RoomManager>
          <!-- Show room title if there are no selected ones -->
          <h4 v-else class="text-subtitle-1">
            {{ $t('calc.order.room') }}
          </h4>
        </template>

        <h4
          class="text-subtitle-1 font-weight-bold d-flex justify-space-between mt-3"
        >
          {{ $t('calc.order.price') }}:
          <span class="font-weight-medium">{{
            $n(order.state.value.context.mainServicesPrice, 'currency', {
              notation: 'compact',
            })
          }}</span>
        </h4>
        <hr />
        <h4 class="my-3 text-h6 font-weight-bold">
          {{ $t('calc.order.additional') }}
        </h4>

        <!-- Show dashed line in case no additional services -->
        <AdditionalServices :order="order" />

        <h4 class="text-subtitle-1 mt-4">{{ $t('calc.order.sum.title') }}:</h4>
        <h4 class="text-subtitle-1">
          {{ $t('calc.order.sum.from') }}
          <span class="font-weight-black text-body-1">
            {{
              $n(order.state.value.context.totalPrice, 'currency', {
                notation: 'compact',
              })
            }}
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
