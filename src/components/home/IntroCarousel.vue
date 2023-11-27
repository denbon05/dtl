<script setup lang="ts">
import introCarousel1 from '@/assets/img/intro-carousel-1.png';
import introCarousel2 from '@/assets/img/intro-carousel-2.png';
import introCarousel3 from '@/assets/img/intro-carousel-3.png';
import introCarousel4 from '@/assets/img/intro-carousel-4.png';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const carouselItems = [
  { src: introCarousel1, info: t('intro.carousel.imgDescription.basic') },
  { src: introCarousel2, info: t('intro.carousel.imgDescription.window') },
  { src: introCarousel3, info: t('intro.carousel.imgDescription.office') },
  { src: introCarousel4, info: t('intro.carousel.imgDescription.house') },
];
</script>

<template>
  <v-row id="introCarousel" justify="center" align="center"
    ><v-col>
      <!-- carousel height full height for lg and minus app bar height -->
      <v-carousel
        :height="$vuetify.display.lgAndUp ? $vuetify.display.height - 64 : 840"
        show-arrows="hover"
        cycle
        hide-delimiter-background
        interval="8000"
      >
        <v-carousel-item
          v-for="(item, idx) in carouselItems"
          :key="`carousel-item-${idx}`"
          :src="item.src"
          cover
        >
          <section
            class="w-100 h-100 d-flex flex-column justify-space-between py-15"
          >
            <div class="d-flex justify-center bg-black-fade w-45 pa-5">
              <div class="d-flex flex-column text-white align-center">
                <span class="text-h2 font-weight-bold text-center mb-3 w-50"
                  >{{ $t('intro.carousel.main.title') }}
                </span>
                <p class="text-h6 w-75 px-15">
                  {{ $t('intro.carousel.main.subtitle') }}
                </p>
              </div>
            </div>

            <div class="d-flex justify-end text-black mb-15 pb-10">
              <div class="d-flex justify-start bg-white-fade align-center w-45">
                <p class="text-h4 font-weight-medium w-75 py-7 pl-3">
                  {{ item.info }}
                </p>
              </div>
            </div>
          </section>
        </v-carousel-item>

        <a
          id="cta"
          class="text-md-h2 text-deep-purple-accent-4"
          href="tel:+48575330380"
          ><v-btn
            color="primary"
            rounded="xl"
            size="x-large"
            class="px-10 text-h5"
            >{{ $t('cta.call') }}</v-btn
          >
        </a>
      </v-carousel>
    </v-col></v-row
  >
</template>

<style lang="scss">
#introCarousel {
  position: relative;

  #cta {
    position: absolute;
    top: 15%;
    left: 85%;

    transform: translate(-50%, -50%);
  }

  .w-45 {
    width: 45%;
  }

  .bg-black-fade {
    background-image: linear-gradient(
      to right,
      rgba(16, 16, 16, 0.59) 0%,
      rgba(24, 24, 24, 0.6) 50%,
      rgba(16, 16, 16, 0) 100%
    );
  }

  .bg-white-fade {
    background-image: linear-gradient(
      to left,
      rgba(255, 255, 255, 0.59) 0%,
      rgba(247, 247, 247, 0.6) 46%,
      rgba(242, 242, 242, 0.6) 85%,
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
