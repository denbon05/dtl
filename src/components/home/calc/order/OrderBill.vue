<script setup lang="ts">
import { usePriceList } from '@/composables/pricelist';
import type { IRoomType } from '@/types/api/pricelist';
import type { CalcSelectedOpts } from '@/types/calc';
import { toValue } from 'vue';
import { capitalize, computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { opts } = defineProps<{ opts: CalcSelectedOpts }>();

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
  if (shouldIncrease) {
    roomAmountByKey[key] += 1;
    return;
  }

  roomAmountByKey[key] -= 1;
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
      <div class="d-flex flex-column text-start">
        <h4 class="text-subtitle-1">{{ serviceTitle }}</h4>
        <h4 class="text-subtitle-1">{{ cleaningTitle }}</h4>
        <h4 class="text-subtitle-1" v-if="opts.isVeryDirty">
          *{{ capitalize($t('services.extraInfo.veryDirty')) }}
        </h4>

        <!-- Show room title if there are no selected ones -->
        <h4 v-if="!areRoomsSelected" class="text-subtitle-1">
          {{ $t('calc.order.room') }}
        </h4>
        <!-- There are selected rooms - show options -->
        <div v-else class="d-flex flex-column">
          <template v-for="roomKey in opts.rooms" :key="roomKey">
            <v-list class="pl-0 ml-0 d-flex justify-space-between flex-nowrap">
              <div class="flex-1-0">{{ $t(`service.room.${roomKey}`) }}</div>
              <div class="flex-1 mx-4">
                <!-- Increase/decrease room amount -->
                <v-btn
                  icon="mdi:mdi-minus"
                  variant="plain"
                  size="small"
                  density="compact"
                  :disabled="roomAmountByKey[roomKey] <= 1"
                  @click="changeRoomAmount(roomKey, false)"
                >
                </v-btn>
                <span class="px-2">{{ roomAmountByKey[roomKey] }}</span>
                <v-btn
                  icon="mdi:mdi-plus"
                  variant="plain"
                  size="small"
                  density="compact"
                  @click="changeRoomAmount(roomKey)"
                >
                </v-btn>
              </div>
              <!-- Price by room amount -->
              <div class="flex-0-1">
                {{
                  $n(roomsPriceByRoomKey[roomKey], 'currency', {
                    notation: 'compact',
                  })
                }}
              </div>
            </v-list>
            <v-divider insert thickness="1"></v-divider>
          </template>
        </div>

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

        <!-- Show dashed line in case no additional services needed -->
        <hr v-if="!opts.isVeryDirty" class="border-dashed" />

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
