import { fetchPriceList } from '@/api/pricelist';
import type { PriceListByKey } from '@/types/api/pricelist';
import { reactive, ref } from 'vue';

// Keep default pricelist in case network issues.
/** Default price list values */
export const pricelistByKey = reactive<PriceListByKey>({
  initial: {
    cleaning: 200,
  },
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
    room: 50,
    kitchen: 150,
  },
  square: {
    office: {
      basic: 5,
    },
    repair: {
      empty: 10,
      withFurniture: 15,
    },
  },
  additionalService: {
    windowCleaning: { isMinPrice: true, price: 25 },
    ovenCleaning: {
      price: 50,
    },
    kitchenCabinetCleaning: {
      isPerItem: true,
      price: 10,
    },
    balconyCleaning: {
      price: 60,
    },
    refrigeratorCleaning: {
      price: 50,
    },
    radiatorCleaning: {
      isPerItem: true,
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
  window: {
    singleLeafWindow: 25,
    doubleLeafWindow: 45,
    singleLeafBalconyDoor: 40,
    doubleLeafBalconyDoor: 40,
    roofWindow: 40,
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
