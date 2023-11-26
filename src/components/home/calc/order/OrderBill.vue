<script setup lang="ts">
import type { useCalcState } from '@/composables/calc';
import { useOrderState } from '@/composables/order';
import { usePriceList } from '@/composables/pricelist';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import AdditionalServices from './AdditionalServices.vue';
import RoomManager from './RoomManager.vue';
import SquareManager from './SquareManager.vue';

const { calc } = defineProps<{
  calc: ReturnType<typeof useCalcState>;
}>();

const { pricelistByKey } = usePriceList();
const order = useOrderState(calc, pricelistByKey);

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
  <v-sheet id="servicesOrder" border="green" rounded class="py-5 px-3">
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
        href="tel:+48575330380"
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
