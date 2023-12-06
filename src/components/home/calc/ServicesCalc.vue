<script setup lang="ts">
import { useCalcState } from '@/composables/calc';
import { ref, watch } from 'vue';
import AdditionalServices from './additional/AdditionalServices.vue';
import BuildingType from './building/BuildingType.vue';
import CleaningType from './cleaning/CleaningType.vue';
import OrderBill from './order/OrderBill.vue';
import RoomType from './room/RoomType.vue';

const resetCalc = () => {
  // reset additional services
  additionalServicesComponent.value?.resetSelected();
};

const calc = useCalcState();

watch(
  () => calc.state.value.value,
  () => {
    // reset if building service type changed
    resetCalc();
  }
);
watch(
  () => calc.state.value.context.cleaningType,
  () => {
    // reset if cleaning service type changed
    resetCalc();
  }
);

const additionalServicesComponent =
  ref<InstanceType<typeof AdditionalServices>>();
</script>

<template>
  <v-row justify="center">
    <v-col lg="8" xl="7" class="text-center px-5">
      <h1 class="mt-8 mb-5 font-weight-medium" id="calcTitle">
        {{ $t('calc.title') }}
      </h1>
      <p class="text-subtitle-1 text-left">
        {{
          $t('calc.description', {
            number: '+48 575 330 380/ +48 576 471 155/ +48 660 515 666',
            email: 'dtl.worksbb@gmail.com',
          })
        }}
      </p>
    </v-col>
  </v-row>

  <v-row justify="center" class="mt-4"
    ><v-col lg="5" xl="4" class="px-5">
      <section id="servicesCalc" class="d-flex flex-column text-center">
        <BuildingType :calc="calc" />
        <CleaningType
          :calc="calc"
          :enabled="calc.state.value.context.isCleaningSectionEnabled"
        />
        <RoomType
          :enabled="calc.state.value.context.isRoomSectionEnabled"
          :calc="calc"
        />
        <AdditionalServices
          ref="additionalServicesComponent"
          :enabled="calc.state.value.context.isAdditionalSectionEnabled"
          :calc="calc"
        />
      </section>
    </v-col>

    <v-col lg="4" xl="3" class="px-5 pl-lg-5"
      ><OrderBill :calc="calc">
        <template v-if="calc.state.value.value === 'condoSelected'" #subtitle>{{
          $t('calc.order.subtitle')
        }}</template>
      </OrderBill>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.calc {
  &-title {
    background-color: rgb(var(--v-theme-secondary));
    color: #fff;
    padding: 0.6rem;
    margin-bottom: 1.3rem;
  }
}
</style>
