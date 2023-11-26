<script setup lang="ts">
defineProps<{
  itemGroups: { key: string; title: string; subtitles?: string[] }[];
}>();
</script>

<template>
  <div class="d-flex flex-column bg-fade-white">
    <h5 class="text-primary">
      <slot name="title"></slot>
    </h5>

    <v-list>
      <v-list-group
        v-for="(group, groupIdx) of itemGroups"
        :key="`desc-cleaning-item-${group.key}-${groupIdx}`"
      >
        <!-- main title -->
        <v-list-item>{{ group.title }}</v-list-item>

        <!-- in case there are subtitles - show them as subcategory -->
        <template v-if="group.subtitles?.length">
          <v-list-item
            v-for="(subtitle, subtitleIdx) of group.subtitles"
            :key="`desc-subtitle-${subtitleIdx}`"
            >{{ subtitle }}</v-list-item
          >
        </template>
      </v-list-group>
    </v-list>
  </div>
</template>

<style lang="scss">
#aboutCleaning {
  .bg-fade-white {
    background-image: rgba(247, 247, 247, 0.6);
  }
}
</style>
