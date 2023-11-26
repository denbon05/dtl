import type {
  IAdditionalService,
  ICleaningCoefficient,
  IRoomType,
  IServiceCoefficient,
  PriceListByKey,
} from '../api/pricelist';

export type CalcCategoryItem<
  T extends keyof PriceListByKey,
  K extends keyof PriceListByKey[T] = keyof PriceListByKey[T],
> = Record<
  K,
  {
    selected: boolean;
    icon?: string;
  }
>;

export type CalcSelectedOpts = {
  service?: keyof IServiceCoefficient;
  cleaning?: keyof ICleaningCoefficient;
  rooms: (keyof IRoomType)[];
  additionalServices: (keyof IAdditionalService)[];
};
