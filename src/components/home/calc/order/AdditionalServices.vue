<script setup lang="ts">
import type { useOrderState } from '@/composables/order';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { order } = defineProps<{ order: ReturnType<typeof useOrderState> }>();

const { t } = useI18n();

const additionalServices = computed(() => {
  // extract only selected services
  const {
    additionalServiceAmountByKey,
    pricelistByKey: { additionalService },
  } = order.state.value.context;
  return Object.keys(additionalServiceAmountByKey)
    .map((key) => {
      const amount = additionalServiceAmountByKey[key];
      const { title = t(`service.additionalService.${key}`) } =
        additionalService[key];
      return {
        key,
        title,
        amount,
      };
    })
    .filter(({ amount }) => amount > 0);
});
</script>

<template>
  <div id="orderAdditionalServices">
    <hr v-if="!additionalServices.length" class="border-dashed" />

    <v-list v-else density="compact">
      <div
        v-for="service in additionalServices"
        :key="`additional-order-service-${service.key}`"
        class="d-flex flex-column"
      >
        <div class="d-flex justify-space-between">
          <div class="text-no-wrap text-body-1">{{ service.title }}</div>

          <div class="d-flex">
            <div class="d-flex">
              <div>
                <v-icon icon="mdi:mdi-plus" size="x-small"></v-icon>
              </div>
              <div>
                {{ service.amount }}
              </div>
              <div>
                <v-icon icon="mdi:mdi-minus" size="x-small"></v-icon>
              </div>
            </div>

            <span>price</span>
          </div>
        </div>
        <v-divider insert thickness="1"></v-divider>
      </div>
    </v-list>
  </div>
</template>
