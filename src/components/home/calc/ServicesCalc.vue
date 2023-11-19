<script setup lang="ts">
import type {
  IAdditionalService,
  IBuildingCoefficient,
  ICleaningCoefficient,
  IRoomType,
} from '@/types/api/pricelist';
import OrderBill from './order/OrderBill.vue';
import BuildingType from './building/BuildingType.vue';
import CleaningType from './cleaning/CleaningType.vue';
import RoomType from './room/RoomType.vue';
import { reactive } from 'vue';
import type { CalcSelectedOpts } from '@/types/calc';

const selectedOptions = reactive<CalcSelectedOpts>({
  rooms: [],
  additionalServices: [],
});

const setBuildingType = (buildingCoeffKey: keyof IBuildingCoefficient) => {
  console.log('setBuildingType', buildingCoeffKey);
  selectedOptions.service = buildingCoeffKey;
};
const setCleaningType = (cleaningCoeffKey: keyof ICleaningCoefficient) => {
  console.log('setCleaningType', cleaningCoeffKey);
  selectedOptions.cleaning = cleaningCoeffKey;
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
        <CleaningType @select="setCleaningType" />
        <RoomType @select="setRoomType" />
      </section>
    </v-col>

    <v-col cols="4" lg="3" class="px-5"
      ><OrderBill :opts="selectedOptions" />
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
