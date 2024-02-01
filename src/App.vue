<script setup lang="ts">
import { useCookies } from '@/composables/cookies';
import AppBar from './components/common/AppBar.vue';
import AppCookies from './components/common/AppCookies.vue';
import AppFooter from './components/common/AppFooter.vue';
import { CookiesConcern } from './types/browser-storage';

const { cookiesConcern } = useCookies();
</script>

<template>
  <v-app>
    <AppBar />

    <v-main>
      <RouterView />
    </v-main>

    <AppCookies v-if="cookiesConcern === CookiesConcern.UNSETTLED" />
    <AppFooter class="mt-2" />
  </v-app>
</template>

<style lang="scss">
.w-45 {
  width: 45%;
}
</style>
./types/browser-storage
