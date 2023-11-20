<script setup lang="ts">
defineProps<{
  modelValue: boolean;
  icon: string;
}>();

defineEmits<{
  (e: 'select'): void;
}>();
</script>

<template>
  <v-card
    @click="$emit('select')"
    hover
    class="px-1 py-6 cursor-pointer d-flex align-lg-center"
    rounded
    :variant="modelValue ? 'outlined' : 'elevated'"
    :border="!modelValue"
    width="160"
  >
    <v-icon class="flex-grow-1" :icon="icon" size="44"></v-icon>
    <span class="text-wrap text-left">
      <slot></slot>
    </span>
  </v-card>
</template>
