export interface IServiceCoefficient {
  condo: number;
  office: number;
  afterRepair: number;
}

export interface ICleaningCoefficient {
  basic: number;
  accurate: number;
}

export interface IRoomType {
  bathroom: number;
  room: number;
  kitchen: number;
}

export interface IAdditionalService {
  [key: string]: {
    price: number;
    title?: string;
  };
}

export interface ISquarePrice {
  emptyRoom: number;
  roomAfterRepair: number;
}

export type PriceListByKey = {
  serviceCoefficient: IServiceCoefficient;
  cleaningCoefficient: ICleaningCoefficient;
  square: ISquarePrice;
  roomType: IRoomType;
  additionalService: IAdditionalService;
};
