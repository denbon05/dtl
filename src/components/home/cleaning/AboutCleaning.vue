<script setup lang="ts">
import type { DescItems } from '@/types/components/cleaning-about';
import type { LocaleMessages } from '@/types/locale';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import BathroomCleaning from './BathroomCleaning.vue';
import KitchenCleaning from './KitchenCleaning.vue';
import OfficeCleaning from './OfficeCleaning.vue';
import OtherCleaning from './OtherCleaning.vue';
import RoomCleaning from './RoomCleaning.vue';
import WindowCleaning from './WindowCleaning.vue';

const { t, te, locale, getLocaleMessage } = useI18n();

const keyToComponent: Record<string, any> = {
  room: RoomCleaning,
  kitchen: KitchenCleaning,
  bathroom: BathroomCleaning,
  office: OfficeCleaning,
  windows: WindowCleaning,
  other: OtherCleaning,
};

const messages: LocaleMessages = getLocaleMessage(locale.value);

const serviceKeys: (keyof LocaleMessages['cleaning']['services'])[] = [
  'room',
  'kitchen',
  'bathroom',
  'office',
  'windows',
  'other',
];

// keys are the same as in LocaleMessages['cleaning']['categories']
const categories = serviceKeys.map((key, idx) => {
  const services = messages.cleaning.services[key];

  const basicServices: DescItems = (services.basic as DescItems).map(
    (item, i) => ({
      title: t(`cleaning.services.${key}.basic[${i}].title`),
      subtitle: te(`cleaning.services.${key}.basic[${i}].subtitle`)
        ? t(`cleaning.services.${key}.basic[${i}].subtitle`)
        : '',
    })
  );

  const accurateServices: DescItems = // @ts-ignore
    ((services?.accurate || []) as DescItems).map((item, i) => ({
      title: t(`cleaning.services.${key}.accurate[${i}].title`),
      subtitle: te(`cleaning.services.${key}.accurate[${i}].subtitle`)
        ? t(`cleaning.services.${key}.accurate[${i}].subtitle`)
        : '',
    }));

  return {
    basicServices,
    accurateServices,
    title: t(`cleaning.categories[${idx}]`),
    key,
    tabComponent: keyToComponent[key],
  };
});

// first item by default
const tab = ref<(typeof categories)[number]['key']>(categories[0].key);

const tabsHeight = 72;
const imgContentHeight = 760;
</script>

<template>
  <v-row justify="center" class="mt-15">
    <v-col cols="11" lg="9" xl="7">
      <div class="d-flex flex-column align-center">
        <h1 class="text-center my-5 font-weight-medium">
          {{ $t('cleaning.title') }}
        </h1>
        <h4 class="text-h6 px-2">{{ $t('cleaning.description') }}</h4>
      </div>

      <!-- whole height = tab content + tabs height -->
      <v-card :height="imgContentHeight + tabsHeight" class="my-7">
        <v-tabs :height="tabsHeight" v-model="tab" bg-color="secondary" grow>
          <v-tab
            v-for="category of categories"
            :key="`cleaning-category-${category.key}`"
            :value="category.key"
            class="font-weight-bold text-h6"
            variant="text"
            >{{ category.title }}</v-tab
          >
        </v-tabs>

        <v-lazy :options="{ threshold: 0 }" transition="fade-transition">
          <v-window v-model="tab">
            <v-window-item
              v-for="{
                key,
                tabComponent,
                basicServices,
                accurateServices,
              } of categories"
              :key="`cleaning-category-content-${key}`"
              :value="key"
            >
              <component
                class="tab-item"
                :is="tabComponent"
                :height="imgContentHeight"
                :basics="basicServices"
                :advanced="accurateServices"
              ></component>
            </v-window-item>
          </v-window>
        </v-lazy>
      </v-card>
    </v-col>
  </v-row>
</template>
