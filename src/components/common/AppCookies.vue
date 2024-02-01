<script setup lang="ts">
import { useCookies } from '@/composables/cookies';
import { CookiesConcern } from '@/types/browser-storage';
import { ref } from 'vue';

const { cookiesConcern, setCookiesConcern } = useCookies();

const isDialogVisible = ref(cookiesConcern.value === CookiesConcern.UNSETTLED);

const allowCookies = () => {
  setCookiesConcern(CookiesConcern.ALLOWED);
  isDialogVisible.value = false;
};

const denyCookies = () => {
  setCookiesConcern(CookiesConcern.DENIED);
  isDialogVisible.value = false;
};
</script>

<template>
  <v-banner
    stacked
    rounded="xl"
    icon="mdi:mdi-cookie"
    color="warning"
    elevation="4"
    bg-color="app-yellow"
  >
    <template v-slot:text>
      {{ $t('cookies.concern.desc') }}
    </template>

    <template v-slot:actions>
      <v-btn color="grey-darken-5" variant="text" @click="denyCookies">
        {{ $t('cookies.concern.deny') }}
      </v-btn>

      <v-btn color="green-darken-4" variant="text" @click="allowCookies">
        {{ $t('cookies.concern.allow') }}
      </v-btn>
    </template>
  </v-banner>
</template>

<style lang="scss">
.v-banner {
  position: fixed !important;
  width: fit-content !important;
  bottom: 0;
  transform: translate(-50%, -50%);
  left: 50%;
  z-index: 100;
  overflow: visible !important;

  .v-banner-actions {
    margin-top: 0 !important;
  }
}
</style>
@/types/browser-storage
