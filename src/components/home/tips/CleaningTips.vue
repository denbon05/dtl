<script setup lang="ts">
import femaleClothesImg from '@/assets/img/female-clothes-and-shoes-in-a-boutique.webp';
import glassOfMilkImg from '@/assets/img/glass-of-milk-spilled-on-gray-color-carpet.webp';
import cleaningHomeImg from '@/assets/img/woman-cleaning-home.webp';
</script>

<template>
  <v-row justify="center">
    <v-col cols="11" lg="9" xl="7" class="d-flex flex-column">
      <h1 class="text-center my-6 font-weight-medium">
        {{ $t('tips.title') }}
      </h1>

      <p class="font-weight-bold mt-4 mb-7">{{ $t('tips.caption') }}:</p>

      <div class="d-flex">
        <div class="d-flex flex-column">
          <p class="text-body-2 mb-2">{{ $t('tips.desc') }}</p>
          <!-- Show first 2 tips with the image in a row -->
          <p
            v-for="(tipNum, tipIdx) of [1, 2]"
            :key="`cleaning-tip-${tipNum}`"
            class="text-body-2 d-flex align-baseline my-2"
          >
            <span class="mr-1">{{ tipNum }}.</span>
            {{ $t(`tips.cleaningSteps[${tipIdx}]`) }}
          </p>
        </div>
        <div class="mx-6">
          <v-img
            :src="femaleClothesImg"
            width="330"
            :alt="$t('alt.img.wardrobeCleaning')"
          ></v-img>
        </div>
      </div>

      <div class="my-5">
        <v-img
          :src="glassOfMilkImg"
          width="330"
          class="float-left mr-6"
          :alt="$t('alt.img.carpetCleaning')"
        ></v-img>
        <!-- Show the third tip -->
        <p class="text-body-2">
          <span class="mr-1">3.</span>{{ $t(`tips.cleaningSteps[2]`) }}
        </p>

        <v-img
          :src="cleaningHomeImg"
          :alt="$t('alt.img.lightCleaning')"
          width="330"
          class="float-right mx-6 my-3"
        ></v-img>

        <!-- Show the rest of the tips -->
        <p
          v-for="tipNum of [4, 5, 6]"
          :key="`cleaning-tip-${tipNum}`"
          class="text-body-2 d-flex align-baseline my-2"
        >
          <span class="mr-1">{{ tipNum }}.</span>
          {{ $t(`tips.cleaningSteps[${tipNum - 1}]`) }}
        </p>
      </div>
    </v-col>
  </v-row>
</template>
