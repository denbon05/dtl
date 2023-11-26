<script setup lang="ts">
import BathroomCleaning from './BathroomCleaning.vue';
import KitchenCleaning from './KitchenCleaning.vue';
import OfficeCleaning from './OfficeCleaning.vue';
import OtherCleaning from './OtherCleaning.vue';
import RoomCleaning from './RoomCleaning.vue';
import WindowCleaning from './WindowCleaning.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const keyToComponent: Record<string, any> = {
  room: RoomCleaning,
  kitchen: KitchenCleaning,
  bathroom: BathroomCleaning,
  office: OfficeCleaning,
  windows: WindowCleaning,
  other: OtherCleaning,
};

const categories = [
  'room',
  'kitchen',
  'bathroom',
  'office',
  'windows',
  'other',
].map((key, idx) => ({
  title: t(`cleaning.categories[${idx}]`),
  key,
  tabComponent: keyToComponent[key],
}));

// first item by default
const tab = ref<(typeof categories)[number]['key']>(categories[0].key);
</script>

<template>
  <v-row justify="center" id="aboutCleaning" class="mt-15">
    <v-col cols="9">
      <div class="d-flex flex-column align-center">
        <h2 class="text-center my-5">{{ $t('cleaning.title') }}</h2>
        <h4 class="text-h6 px-2">{{ $t('cleaning.description') }}</h4>
      </div>

      <v-card height="760" class="my-7">
        <v-tabs height="72" v-model="tab" bg-color="secondary" grow>
          <v-tab
            v-for="category of categories"
            :key="`cleaning-category-${category.key}`"
            :value="category.key"
            class="text-h6"
            variant="text"
            >{{ category.title }}</v-tab
          >
        </v-tabs>

        <v-window v-model="tab">
          <v-window-item
            v-for="{ key, tabComponent } of categories"
            :key="`cleaning-category-content-${key}`"
            :value="key"
          >
            <component :is="tabComponent"></component>
          </v-window-item>
        </v-window>
      </v-card>
    </v-col>
  </v-row>
</template>
