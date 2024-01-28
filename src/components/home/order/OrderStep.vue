<script setup lang="ts">
defineProps<{
  img: string;
}>();
</script>

<template>
  <div class="d-flex flex-column align-center mx-4">
    <div class="text-h6 d-flex justify-center text-center my-4">
      <slot name="title"></slot>
    </div>

    <div class="d-flex justify-center my-4">
      <div>
        <v-img :src="img" :alt="$t('alt.img.orderStep')" width="100"></v-img>
      </div>
    </div>

    <p class="my-4 w-75 d-flex justify-center text-center">
      <slot name="description"></slot>
    </p>
  </div>
</template>
