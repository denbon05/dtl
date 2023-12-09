<script setup lang="ts">
import fbLogo from '@/assets/img/fb-logo.png';
import fitProjectLogo from '@/assets/img/fit-project-logo.png';
import instagramLogo from '@/assets/img/instagram-logo.png';
import telegramLogo from '@/assets/img/telegram-logo.png';
import whatsAppLogo from '@/assets/img/whatsapp-icon-x50.png';
import appLogo from '@/assets/img/app-logo-130x80.png';
import ActionBtn from '@/components/common/ActionBtn.vue';
import {
  FB_URL,
  FIT_PROJECT_EMAIL,
  FIT_PROJECT_NUMBER,
  INSTAGRAM_URL,
  TELEGRAM_URL,
  CONTACT_PHONE_NUMBER,
  SECONDARY_PHONE_NUMBER,
  EXTRA_PHONE_NUMBER,
  CONTACT_EMAIL,
  FIT_PROJECT_URL,
  WHATSAPP_URL,
} from '@/constants/';

const contacts = [
  {
    value: CONTACT_PHONE_NUMBER,
    icon: 'mdi:mdi-phone-outline',
    link: `tel:${CONTACT_PHONE_NUMBER}`,
  },
  {
    value: SECONDARY_PHONE_NUMBER,
    icon: 'mdi:mdi-phone-outline',
    link: `tel:${SECONDARY_PHONE_NUMBER}`,
  },
  {
    value: EXTRA_PHONE_NUMBER,
    icon: 'mdi:mdi-phone-outline',
    link: `tel:${EXTRA_PHONE_NUMBER}`,
  },
  {
    value: CONTACT_EMAIL,
    icon: 'mdi:mdi-email-outline',
    link: `mailto:${CONTACT_EMAIL}`,
  },
];
</script>

<template>
  <v-footer class="pa-0">
    <v-container fluid class="pa-0">
      <v-row justify="center" align="center">
        <v-col cols="6">
          <div class="d-flex flex-column align-center">
            <img width="120" :src="appLogo" alt="'DTL' logo." class="my-2" />
            <span class="text-body-1">{{ $t('main.desc') }}</span>
            <div class="d-flex my-5">
              <a
                v-for="(contact, idx) of contacts"
                :key="`contact-item-${idx}`"
                class="mx-3 text-decoration-none text-black text-no-wrap"
                :href="contact.link"
              >
                <v-icon :icon="contact.icon" color="green" class="mr-1" />{{
                  contact.value
                }}
              </a>
            </div>
            <div class="d-flex flex-column my-3">
              <span class="text-body-1 text-center">{{
                $t('cta.consult')
              }}</span>
              <action-btn class="my-3"></action-btn>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row justify="center" align="stretch" class="bg-app-yellow pa-2 mt-8">
        <v-col cols="3" class="d-flex justify-center">
          <div class="flex-column align-start">
            <div class="d-flex justify-start">
              <div class="d-flex flex-column align-start">
                <strong
                  class="text-center text-body-2 font-weight-black mb-4"
                  >{{ $t('partner.title') }}</strong
                >
                <a
                  :href="`tel:${FIT_PROJECT_NUMBER}`"
                  class="text-decoration-none text-black"
                  >{{ FIT_PROJECT_NUMBER }}</a
                >
              </div>
              <a :href="FIT_PROJECT_URL" target="_blank">
                <img
                  :src="fitProjectLogo"
                  class="mx-3"
                  width="66"
                  alt="Green apple with text 'Fit Project' inside."
              /></a>
            </div>
            <a
              class="text-decoration-none text-black text-no-wrap"
              :href="`mailto:${FIT_PROJECT_EMAIL}`"
              >{{ FIT_PROJECT_EMAIL }}</a
            >
          </div>
        </v-col>

        <v-spacer></v-spacer>

        <v-col
          align-self="end"
          cols="5"
          class="d-flex h-100 justify-center align-end"
        >
          <div class="d-flex justify-center align-end text-body-2">
            <div>
              <v-icon icon="mdi:mdi-copyright" />
              {{ new Date().getFullYear() }} — DTL
            </div>
          </div>
        </v-col>

        <v-spacer></v-spacer>

        <v-col align-self="center" cols="3">
          <div class="d-flex justify-center">
            <a :href="INSTAGRAM_URL" target="_blank">
              <img
                :src="instagramLogo"
                alt="Instagram logo"
                width="40"
                class="mx-2"
            /></a>
            <a :href="FB_URL" alt="Facebook logo." target="_blank">
              <img :src="fbLogo" width="40" class="mx-2"
            /></a>
            <a :href="TELEGRAM_URL" alt="Telegram logo." target="_blank">
              <img :src="telegramLogo" width="40" class="mx-2"
            /></a>
            <a :href="WHATSAPP_URL" alt="WhatsApp logo." target="_blank">
              <img :src="whatsAppLogo" width="40" class="mx-2"
            /></a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
