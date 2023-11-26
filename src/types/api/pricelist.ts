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
  office: {
    basic: number;
  };
  repair: {
    empty: number;
    withFurniture: number;
  };
}

export interface IInitial {
  cleaning: number;
}

export interface IWindow {
  singleLeaf: number;
  doubleLeaf: number;
  singleLeafBalconyDoor: number;
  doubleLeafBalconyDoor: number;
  roofWindow: number;
}

export type PriceListByKey = {
  initial: IInitial;
  serviceCoefficient: IServiceCoefficient;
  cleaningCoefficient: ICleaningCoefficient;
  square: ISquarePrice;
  window: IWindow;
  roomType: IRoomType;
  additionalService: IAdditionalService;
};
