<script setup lang="ts">
import type { IDescSection } from '@/types/components/cleaning-about';

defineProps<{
  items: IDescSection[];
}>();
</script>

<template>
  <div class="d-flex flex-column bg-fade-white desc-item pa-5 pl-8">
    <h5 class="text-primary mb-5">
      <slot name="title"></slot>
    </h5>

    <ul>
      <li
        v-for="(item, idx) of items"
        :key="`desc-cleaning-item-${item.title}-${idx}`"
      >
        <!-- main title -->
        <span>{{ item.title }}</span>

        <!-- in case there are subtitle show it as subcategory -->
        <ul v-if="item.subtitle" class="pl-5 desc-subtitle">
          <li>{{ item.subtitle }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
#aboutCleaning {
  .desc-item {
    border-radius: 5px;
    box-shadow: 1px 2px 3px grey;
  }

  .bg-fade-white {
    background-color: rgba(247, 247, 247, 0.6);
  }

  .desc-subtitle {
    list-style-type: none;
    position: relative;

    &::before {
      content: '-';
      position: absolute;
      left: -0.1rem;
    }
  }
}
</style>
