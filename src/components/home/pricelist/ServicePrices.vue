<script setup lang="ts">
import { usePriceList } from '@/composables/pricelist';
import { computed } from 'vue';

// without destruction - lose reactivity
const pricelist = usePriceList();

const additionalServicesPricelist = computed(() =>
  Object.values(pricelist.pricelistByKey.additionalService)
);
</script>

<template>
  <div class="d-flex flex-wrap w-100 justify-space-between">
    <div
      v-for="(service, idx) of additionalServicesPricelist"
      :key="`additional-service-item-${idx}`"
      class="d-flex justify-center"
      :class="{
        'w-50': !$vuetify.display.lgAndUp,
        'w-33': $vuetify.display.lgAndUp,
      }"
    >
      <div class="w-75 mb-3">
        <div class="d-flex justify-space-between">
          <span>{{ service.title }}</span>
          <span class="text-no-wrap">
            <template v-if="service.isMinPrice">{{
              $t('price.helpers.from')
            }}</template>
            {{ $n(service.price, 'currency') }}
            <template v-if="service.isPerItem"
              >/{{ $t('price.helpers.item') }}</template
            >
          </span>
        </div>
        <hr class="hr-fade" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hr-fade {
  border: 1px solid rgba(128, 128, 128, 0.1);
}
</style>
