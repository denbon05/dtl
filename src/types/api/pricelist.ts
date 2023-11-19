export interface IBuildingCoefficient {
  condo: number;
  house: number;
  office: number;
}

export interface ICleaningCoefficient {
  basic: number;
  accurate: number;
  afterRepair: number;
}

export interface IRoomType {
  bathroom: number;
  room: number;
  kitchen: number;
}

export interface IAdditionalService {
  windowCleaning: number;
  ovenCleaning: number;
  kitchenCabinetCleaning: number;
  balconyCleaning: number;
  refrigeratorCleaning: number;
  furnitureCleaning: number;
  doorCleaning: number;
  dishwasherCleaning: number;
  trashTakingOut: number;
  dishesCleaning: number;
  kitchenHoodCleaning: number;
  microwaveCleaning: number;
  ironing: number;
  baseboardCleaning: number;
  wallCleaning: number;
  rollerBlindsCleaning: number;
}

export interface IExtraOptions {
  veryDirtyCoefficient: number;
}

export type PriceListByKey = {
  buildingCoefficient: IBuildingCoefficient;
  cleaningCoefficient: ICleaningCoefficient;
  roomType: IRoomType;
  additionalService: IAdditionalService;
  extra: IExtraOptions;
};
