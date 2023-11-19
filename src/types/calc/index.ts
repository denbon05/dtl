import type {
  IAdditionalService,
  IBuildingCoefficient,
  ICleaningCoefficient,
  IRoomType,
  PriceListByKey,
} from '../api/pricelist';

export type CalcCategoryItem<
  T extends keyof PriceListByKey,
  K extends keyof PriceListByKey[T] = keyof PriceListByKey[T],
> = Record<
  K,
  {
    selected: boolean;
    title: string;
    icon?: string;
  }
>;

export type CalcSelectedOpts = {
  service?: keyof IBuildingCoefficient;
  cleaning?: keyof ICleaningCoefficient;
  rooms: (keyof IRoomType)[];
  additionalServices: (keyof IAdditionalService)[];
  isVeryDirty?: boolean;
};
