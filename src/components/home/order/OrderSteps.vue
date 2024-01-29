<script setup lang="ts">
import clockYellowBg from '@/assets/img/clock-yellow-bg.png';
import phoneYellowBg from '@/assets/img/phone-yellow-bg.png';
import starYellowBg from '@/assets/img/star-yellow-bg.png';
import ActionBtn from '@/components/common/ActionBtn.vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import OrderStep from './OrderStep.vue';

const i18nKeys = ['phone', 'day', 'result'] as const;
const i18nKeyToImg: Record<(typeof i18nKeys)[number], any> = {
  day: clockYellowBg,
  phone: phoneYellowBg,
  result: starYellowBg,
};

const { t } = useI18n();

const steps = computed(() =>
  i18nKeys.map((key) => ({
    key,
    title: t(`order.steps.${key}.title`),
    description: t(`order.steps.${key}.desc`),
    img: i18nKeyToImg[key],
  }))
);
</script>

<template>
  <v-row justify="center">
    <v-col cols="11" lg="9" xl="8" class="d-flex flex-column">
      <h2 class="text-center my-6 font-weight-medium text-h4">
        {{ $t('order.steps.title') }}
      </h2>

      <v-row class="d-flex justify-space-around mt-2 mb-5">
        <v-col cols="4" v-for="step of steps" :key="`order-step-${step.key}`">
          <order-step :img="step.img">
            <template #title>{{ step.title }}</template>
            <template #description>{{ step.description }}</template>
          </order-step>
        </v-col>
      </v-row>

      <div class="d-flex justify-center my-5">
        <action-btn></action-btn>
      </div>
    </v-col>
  </v-row>
</template>
