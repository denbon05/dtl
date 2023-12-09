<script setup lang="ts">
import type { useOrderState } from '@/composables/order';
import type { IAdditionalService } from '@/types/api/pricelist';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { order } = defineProps<{ order: ReturnType<typeof useOrderState> }>();

const { t } = useI18n();

const additionalServices = computed(() => {
  const {
    additionalServiceAmountByKey,
    pricelistByKey: { additionalService },
  } = order.state.value.context;
  // extract only selected services
  return Object.keys(additionalServiceAmountByKey)
    .map((key) => {
      const amount = additionalServiceAmountByKey[key];
      const { title = t(`service.additionalService.${key}`) } =
        additionalService[key];
      return {
        key,
        title,
        amount,
        price: additionalService[key].price * amount,
      };
    })
    .filter(({ amount }) => amount > 0);
});

const updateAdditionalServiceAmountByKey = (
  key: keyof IAdditionalService,
  shouldIncrease = true
) => {
  order.send('UPDATE_ADDITIONAL_SERVICE_AMOUNT', { key, shouldIncrease });
};
</script>

<template>
  <div id="orderAdditionalServices">
    <hr v-if="!additionalServices.length" class="border-dashed" />

    <div v-else density="compact">
      <div
        v-for="service in additionalServices"
        :key="`additional-order-service-${service.key}`"
        class="d-flex flex-column"
      >
        <v-row class="d-flex jma-0 pa-0">
          <v-col cols="6" class="text-no-wrap text-body-1">{{
            service.title
          }}</v-col>

          <v-col cols="3" class="d-flex align-baseline justify-end mp-2">
            <v-btn
              icon="mdi:mdi-minus"
              variant="plain"
              size="small"
              :disabled="service.amount <= 1"
              density="compact"
              @click="updateAdditionalServiceAmountByKey(service.key, false)"
            >
            </v-btn>
            <span class="mx-2">
              {{ service.amount }}
            </span>
            <v-btn
              icon="mdi:mdi-plus"
              variant="plain"
              size="small"
              :disabled="service.amount >= 99"
              density="compact"
              @click="updateAdditionalServiceAmountByKey(service.key)"
            >
            </v-btn>
          </v-col>
          <v-col cols="3" class="d-flex justify-end">{{
            $n(service.price, 'currency')
          }}</v-col>
        </v-row>
        <v-divider insert thickness="1"></v-divider>
      </div>
    </div>
  </div>
</template>
