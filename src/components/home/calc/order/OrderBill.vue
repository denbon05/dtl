<script setup lang="ts">
import type { useCalcState } from '@/composables/calc';
import { useOrderState } from '@/composables/order';
import { usePriceList } from '@/composables/pricelist';
import { CONTACT_PHONE_NUMBER } from '@/constants/';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import greenWave from '@/assets/img/green-wave.svg';
import AdditionalServices from './AdditionalServices.vue';
import RoomManager from './RoomManager.vue';
import SquareManager from './SquareManager.vue';

const { calc } = defineProps<{
  calc: ReturnType<typeof useCalcState>;
}>();

const pricelist = usePriceList();
const order = useOrderState(calc, pricelist.pricelistByKey);

const { t } = useI18n();

const serviceTitle = computed(() => {
  // if service type is selected show it in oder case show default title
  const { tags, value } = order.state.value;
  const shouldServiceTitleBeVisible = tags.has('actualTitles');
  const i18Key = (value as string).replace('Selected', '');
  return shouldServiceTitleBeVisible
    ? t(`service.building.${i18Key}`)
    : t('calc.order.service');
});

const areRoomsSelected = computed(
  () => calc.state.value.context.shouldAllRoomsBeSelected
);
</script>

<template>
  <v-sheet id="servicesOrder" class="pt-5 pb-10 px-5 wave">
    <section class="d-flex flex-column text-center">
      <h2>{{ $t('calc.order.title') }}</h2>
      <span class="my-3 mx-2 text-caption text-medium-emphasis">
        <slot name="subtitle"></slot
      ></span>

      <div class="d-flex flex-column text-start">
        <h4 class="text-subtitle-1">{{ serviceTitle }}</h4>

        <template v-if="order.state.value.tags.has('squareMode')">
          <SquareManager :order="order" :calc="calc"></SquareManager>
        </template>
        <template v-else>
          <!-- There are selected rooms - show options -->
          <RoomManager v-if="areRoomsSelected" :order="order"></RoomManager>
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
            $n(order.state.value.context.mainServicesPrice, 'currency')
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
          <!-- TODO https://vue-i18n.intlify.dev/guide/advanced/component#scope-resolving -->
          {{ $t('calc.order.sum.from') }}
          <span class="font-weight-black text-body-1">
            {{ $n(order.state.value.context.totalPrice, 'currency') }}
          </span>
        </h4>
      </div>

      <p class="m text-left font-italic text-subtitle-2 my-4">
        {{ $t('calc.order.info') }}
      </p>

      <a
        class="text-h4 text-md-h2 text-deep-purple-accent-4"
        :href="`tel:${CONTACT_PHONE_NUMBER}`"
        ><v-btn
          color="primary"
          rounded="xl"
          size="large"
          class="px-10 pt-1 text-subtitle-1 font-weight-bold"
          >{{ $t('cta.call') }}</v-btn
        >
      </a>
    </section>
    <img draggable="false" class="wave-bottom" :src="greenWave" />
  </v-sheet>
</template>

<style lang="scss" scoped>
#servicesOrder {
  border: 0.3px solid;
  border-color: rgb(var(--v-theme-primary));
  border-bottom: none;
  border-radius: 8px 8px 0 0;
}

.wave {
  position: relative;

  .wave-bottom {
    position: absolute;
    max-width: 100%;
    bottom: -7.2px;
    left: 0;
  }
}
</style>
