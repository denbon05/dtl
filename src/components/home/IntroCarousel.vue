<script setup lang="ts">
import glovesWithSofaImg from '@/assets/img/intro-carousel-gloves-with-sofa.webp';
import officeImg from '@/assets/img/intro-carousel-office.webp';
import windowImg from '@/assets/img/intro-carousel-window.webp';
import vacuumImg from '@/assets/img/intro-vacuum.webp';
import ActionBtn from '@/components/common/ActionBtn.vue';
import { onMounted, ref, toValue } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';

const { t } = useI18n();

const carouselItems = [
  {
    src: glovesWithSofaImg,
    info: t('intro.carousel.imgDescription.basic'),
    alt: 'Yellow gloves with sofa',
  },
  {
    src: vacuumImg,
    info: t('intro.carousel.imgDescription.house'),
    alt: 'Woman holding a vacuum',
  },
  {
    src: officeImg,
    info: t('intro.carousel.imgDescription.office'),
    alt: 'Workers clean up the office',
  },
  {
    src: windowImg,
    info: t('intro.carousel.imgDescription.window'),
    alt: 'Yellow gloves cleaning the window',
  },
];

// default value
const carouselHeight = ref(64);
const display = useDisplay();

onMounted(() => {
  const headerEl = document.querySelector('header');

  if (headerEl) {
    // compute dynamically carousel height
    const visibleBottomSectionRangeInPx = 200;
    const defaultCarouselItemHeight = 840;
    // carousel height full height for lg and minus app bar height
    carouselHeight.value = display.lgAndUp
      ? toValue(display.height) -
        (headerEl.offsetHeight + visibleBottomSectionRangeInPx)
      : defaultCarouselItemHeight;
  }
});
</script>

<template>
  <v-row id="introCarousel" justify="center" align="center"
    ><v-col>
      <v-carousel
        :height="carouselHeight"
        show-arrows="hover"
        cycle
        hide-delimiter-background
        interval="10000"
      >
        <v-carousel-item
          v-for="(item, idx) in carouselItems"
          :key="`carousel-item-${idx}`"
          :src="item.src"
          :alt="item.alt"
          cover
        >
          <section
            class="w-100 h-100 d-flex flex-column justify-space-between py-15 pb-lg-5"
          >
            <div class="d-flex justify-center bg-black-fade w-45 py-4">
              <div
                class="d-flex flex-column text-white align-center text-wrap py-2"
              >
                <h1 class="text-h3 font-weight-bold text-center mb-4">
                  {{ $t('intro.carousel.main.title') }}
                </h1>
                <p class="text-h6 w-75">
                  {{ $t('intro.carousel.main.subtitle') }}
                </p>
              </div>
            </div>

            <div class="d-flex justify-end text-black mb-15 pb-2">
              <div class="d-flex justify-start bg-white-fade align-center w-45">
                <p class="text-h5 font-weight-regular py-3 pl-14 pr-10">
                  {{ item.info }}
                </p>
              </div>
            </div>
          </section>
        </v-carousel-item>

        <action-btn></action-btn>
      </v-carousel> </v-col
  ></v-row>
</template>

<style lang="scss">
#introCarousel {
  position: relative;

  .cta {
    position: absolute;
    top: 15%;
    left: 85%;

    transform: translate(-50%, -50%);
  }

  .bg-black-fade {
    background-image: linear-gradient(
      to right,
      rgba(16, 16, 16, 0.59) 0%,
      rgba(24, 24, 24, 0.6) 45%,
      rgba(24, 24, 24, 0.4) 75%,
      rgba(16, 16, 16, 0) 100%
    );
  }

  .bg-white-fade {
    background-image: linear-gradient(
      to left,
      rgba(255, 255, 255, 0.59) 0%,
      rgba(247, 247, 247, 0.6) 46%,
      rgba(242, 242, 242, 0.5) 85%,
      rgba(250, 249, 249, 0) 100%
    );
  }

  .v-btn--active {
    .v-icon {
      color: green;
    }
  }
}
</style>
