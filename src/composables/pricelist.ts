import { fetchPriceList } from '@/api/pricelist';
import type { PriceListByKey } from '@/types/api/pricelist';
import { reactive, ref } from 'vue';

export const pricelistByKey = reactive<PriceListByKey>({
  initial: {
    cleaning: 200,
  },
  // default values
  serviceCoefficient: {
    condo: 1,
    afterRepair: 1.4,
    office: 1,
  },
  cleaningCoefficient: {
    basic: 1,
    accurate: 1.2,
  },
  roomType: {
    bathroom: 150,
    room: 100,
    kitchen: 150,
  },
  square: {
    emptyRoom: 5,
    roomAfterRepair: 10,
  },
  additionalService: {
    windowCleaning: {
      price: 25,
    },
    ovenCleaning: {
      price: 50,
    },
    kitchenCabinetCleaning: {
      price: 10,
    },
    balconyCleaning: {
      price: 60,
    },
    refrigeratorCleaning: {
      price: 50,
    },
    radiatorCleaning: {
      price: 20,
    },
    coffeeMachineCleaning: {
      price: 25,
    },
    dishwasherCleaning: {
      price: 40,
    },
    kitchenHoodCleaning: {
      price: 45,
    },
    dishesCleaning: {
      price: 30,
    },
    microwaveCleaning: {
      price: 30,
    },
    ironing: {
      price: 50,
    },
  },
});

const isPricelistLoading = ref(true);

// GUI and logic of the calc use the fetched pricelist
// TODO back off
fetchPriceList()
  .then((fetchedPriceList) => {
    Object.assign(pricelistByKey, fetchedPriceList);
  })
  .catch(console.error)
  .finally(() => {
    isPricelistLoading.value = false;
  });

export const usePriceList = () => ({
  pricelistByKey,
  isPricelistLoading,
});
