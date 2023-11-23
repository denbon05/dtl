<script setup lang="ts">
import { useCalcState } from '@/composables/calc';
import type {
  IAdditionalService,
  ICleaningCoefficient,
  IRoomType,
  IServiceCoefficient,
} from '@/types/api/pricelist';
import type { CalcSelectedOpts } from '@/types/calc';
import { reactive } from 'vue';
import BuildingType from './building/BuildingType.vue';
import CleaningType from './cleaning/CleaningType.vue';
import OrderBill from './order/OrderBill.vue';
import RoomType from './room/RoomType.vue';
import AdditionalServices from './additional/AdditionalServices.vue';

const selectedOptions = reactive<CalcSelectedOpts>({
  rooms: [],
  additionalServices: [],
});

const calc = useCalcState();

const setBuildingType = (buildingCoeffKey: keyof IServiceCoefficient) => {
  selectedOptions.service = buildingCoeffKey;
  calc.send('SET_SERVICE', { key: buildingCoeffKey });
};
const setCleaningType = (cleaningCoeffKey: keyof ICleaningCoefficient) => {
  selectedOptions.cleaning = cleaningCoeffKey;
  // depending on the room type cleaning services change
  calc.send('SET_CLEANING_TYPE', { key: cleaningCoeffKey });
  calc.send('SET_CLEANING_TYPE', { key: cleaningCoeffKey });
};
const setRoomType = (roomTypeKey: keyof IRoomType) => {
  console.log('setRoomType', roomTypeKey);
  if (selectedOptions.rooms.includes(roomTypeKey)) {
    // toggle to unselected
    selectedOptions.rooms = selectedOptions.rooms.filter(
      (key) => key !== roomTypeKey
    );
    return;
  }

  selectedOptions.rooms.push(roomTypeKey);
};
const setAdditionalService = (
  additionalServiceKey: keyof IAdditionalService
) => {
  console.log('setAdditionalService', additionalServiceKey);
};
</script>

<template>
  <v-row justify="center">
    <v-col cols="11" lg="8" class="text-center px-5">
      <h1 class="mt-8 mb-5" id="calcTitle">{{ $t('calc.title') }}</h1>
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
    ><v-col cols="7" lg="5" class="px-5">
      <section id="servicesCalc" class="d-flex flex-column text-center">
        <BuildingType @select="setBuildingType" />
        <CleaningType
          :calc-state="calc.state.value.value"
          :enabled="calc.state.value.context.isCleaningSectionEnabled"
          @select="setCleaningType"
        />
        <RoomType
          :enabled="
            calc.state.value.context.isRoomSectionEnabled &&
            !!selectedOptions.cleaning
          "
          :all-room-are-selected="
            calc.state.value.context.shouldAllRoomsBeSelected
          "
          @select="setRoomType"
        />
        <AdditionalServices
          :enabled="
            calc.state.value.context.isAdditionalSectionEnabled &&
            !!selectedOptions.cleaning
          "
          :calc="calc"
        />
      </section>
    </v-col>

    <v-col cols="4" lg="3" class="px-5"
      ><OrderBill :opts="selectedOptions" :calc="calc">
        <template
          v-if="calc.state.value.context.selectedBuildingType === 'condo'"
          #subtitle
          >{{ $t('calc.order.subtitle') }}</template
        >
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
