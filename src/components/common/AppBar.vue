<script setup lang="ts">
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_NUMBER,
  SECONDARY_PHONE_NUMBER,
  EXTRA_PHONE_NUMBER,
  INSTAGRAM_URL,
  FB_URL,
  TELEGRAM_URL,
  WHATSAPP_URL,
} from '@/constants/';
import instagramLogo from '@/assets/img/instagram-logo.png';
import fbLogo from '@/assets/img/fb-logo.png';
import telegramLogo from '@/assets/img/telegram-logo.png';
import whatsappLogo from '@/assets/img/whatsapp-logo.png';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const contacts = [
  { value: CONTACT_EMAIL, link: `mailto:${CONTACT_EMAIL}` },
  { value: CONTACT_PHONE_NUMBER, link: `tel:${CONTACT_PHONE_NUMBER}` },
  { value: SECONDARY_PHONE_NUMBER, link: `tel:${SECONDARY_PHONE_NUMBER}` },
  { value: EXTRA_PHONE_NUMBER, link: `tel:${EXTRA_PHONE_NUMBER}` },
];
const socMedias = [
  {
    icon: instagramLogo,
    link: INSTAGRAM_URL,
    alt: t('alt.logo.instagram'),
  },
  {
    icon: fbLogo,
    link: FB_URL,
    alt: t('alt.logo.fb'),
  },
  {
    icon: telegramLogo,
    link: TELEGRAM_URL,
    alt: t('alt.logo.telegram'),
  },
  {
    icon: whatsappLogo,
    link: WHATSAPP_URL,
    alt: t('alt.logo.whatsapp'),
  },
];

const benchmarks = [
  { title: t('appBar.calc'), anchor: 'calc' },
  { title: t('appBar.cleaning'), anchor: 'cleaning' },
  { title: t('appBar.price'), anchor: 'pricelist' },
  { title: t('appBar.order'), anchor: 'order' },
];
</script>

<template>
  <v-app-bar extension-height="64" height="50" class="pt-0">
    <template #default>
      <section
        class="upper-app-bar bg-app-yellow w-100 py-0 my-0 h-100 text-caption text-no-wrap"
      >
        <div
          class="upper-app-bar-content h-100 d-flex align-center justify-lg-space-around"
        >
          <div>
            {{ $t('main.localization') }}
          </div>
          <!-- contact info -->
          <div class="d-flex">
            <a
              v-for="(contact, idx) of contacts"
              :key="`upper-app-bar-contact-${idx}`"
              :href="contact.link"
              class="mx-1 mx-lg-2 text-decoration-none text-black"
            >
              {{ contact.value }}
            </a>
          </div>
          <!-- soc media items -->
          <div>
            <a
              v-for="(socMedia, idx) of socMedias"
              :key="`upper-app-bar-soc-media-${idx}`"
              :href="socMedia.link"
              target="_blank"
            >
              <img
                :src="socMedia.icon"
                width="25"
                class="mx-1"
                :alt="socMedia.alt"
              />
            </a>
          </div>
        </div>
      </section>
    </template>

    <template #extension>
      <section class="px-lg-10 w-100">
        <section class="d-flex justify-space-between align-center w-100 px-12">
          <router-link to="/">
            <img
              src="@/assets/img/logo.png"
              alt="Purple logo 'DTL'"
              width="55"
              class="mt-1"
            />
          </router-link>
          <!-- anchors -->
          <div class="d-flex justify-space-around justify-lg-end flex-grow-1">
            <router-link
              v-for="(benchmark, idx) of benchmarks"
              :key="`nav-benchmark-item-${idx}`"
              :to="`/#${benchmark.anchor}`"
              class="text-decoration-none mx-3 text-black font-weight-black"
              >{{ benchmark.title }}</router-link
            >
          </div>
        </section>
      </section>
    </template>
  </v-app-bar>
</template>
