<script setup lang="ts">
import otherImg from '@/assets/img/other.png';

defineProps<{
  height: number;
}>();
</script>

<template>
  <v-img
    :src="otherImg"
    :height="height"
    cover
    alt="Cleaning, packages, house, clean room"
    class="pa-5"
  >
    <div class="d-flex justify-space-between h-100 px-lg-5 px-xl-0">
      <div class="d-flex h-75 align-center ml-1 mt-3">
        <div class="option-item align-self-end pb-10">
          <v-icon icon="mdi:mdi-hexagram" color="green"></v-icon>
          <span class="">{{ $t('cleaning.services.other.stairs') }}</span>
        </div>
      </div>

      <div class="w-50 h-50">
        <div
          class="d-flex flex-column py-5 ml-15 w-75 h-50 align-content-space-around"
        >
          <div class="option-item ml-15">
            <v-icon icon="mdi:mdi-hexagram" color="green"></v-icon>
            <span class="text-subtitle-1 text-no-wrap">{{
              $t('cleaning.services.other.balcony')
            }}</span>
          </div>
          <div class="option-item mt-3 text-end">
            <v-icon
              class="icon-right"
              icon="mdi:mdi-hexagram"
              color="green"
            ></v-icon>
            <span class="text-subtitle-1 text-no-wrap">{{
              $t('cleaning.services.other.afterRepair')
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </v-img>
</template>

<style lang="scss" scoped>
.option-item {
  position: relative;

  .v-icon {
    position: absolute;
    left: -20px;
    top: -0.9rem;
  }

  .icon-right {
    position: absolute;
    right: -20px !important;
    left: auto;
  }
}

// attach item option to the relevant section on the picture
@media only screen and (min-width: 1500px) {
  .option-item:nth-child(1) {
    margin-left: 2vw;
  }
}
</style>
