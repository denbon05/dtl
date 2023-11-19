import { fetchPriceList } from '@/api/pricelist';
import type { PriceListByKey } from '@/types/api/pricelist';
import { reactive, ref } from 'vue';

const pricelistByKey = reactive<PriceListByKey>({
  // default values
  buildingCoefficient: {
    condo: 1,
    house: 1.4,
    office: 0,
  },
  cleaningCoefficient: {
    basic: 1,
    accurate: 1.2,
    afterRepair: 1.5,
  },
  roomType: {
    bathroom: 150,
    room: 100,
    kitchen: 150,
  },
  additionalService: {
    windowCleaning: 50,
    ovenCleaning: 50,
    kitchenCabinetCleaning: 60,
    balconyCleaning: 40,
    refrigeratorCleaning: 40,
    furnitureCleaning: 50,
    doorCleaning: 30,
    dishwasherCleaning: 40,
    trashTakingOut: 10,
    dishesCleaning: 20,
    microwaveCleaning: 25,
    ironing: 50,
    kitchenHoodCleaning: 50,
    baseboardCleaning: 20,
    wallCleaning: 35,
    rollerBlindsCleaning: 30,
  },
  extra: {
    veryDirtyCoefficient: 1.2,
  },
});

const isPricelistLoading = ref(true);

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
