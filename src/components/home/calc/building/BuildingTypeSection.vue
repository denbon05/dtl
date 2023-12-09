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
    :class="{
      'border-primary': modelValue,
    }"
    rounded
    :variant="modelValue ? 'outlined' : 'elevated'"
    :border="!modelValue"
    width="160"
  >
    <v-icon class="flex-grow-1" :icon="icon" size="44"></v-icon>
    <span class="text-wrap text-left text-body-2 ml-2">
      <slot></slot>
    </span>
  </v-card>
</template>

<style lang="scss" scoped>
.border-primary {
  border-color: rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.05);
}
</style>
