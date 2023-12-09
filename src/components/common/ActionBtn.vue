<script setup lang="ts">
import { CONTACT_PHONE_NUMBER } from '@/constants/';
</script>

<template>
  <a
    id="cta"
    class="text-deep-purple-accent-4"
    :href="`tel:${CONTACT_PHONE_NUMBER}`"
    ><v-btn
      color="primary"
      rounded="xl"
      size="x-large"
      width="230"
      height="60"
      class="text-h5 pt-1 text-decoration-none font-weight-bold"
      >{{ $t('cta.call') }}</v-btn
    >
  </a>
</template>
