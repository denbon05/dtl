import { useMachine } from '@xstate/vue';
import { createMachine } from 'xstate';
import { pricelistByKey } from './pricelist';
import { useCalcState } from './calc';
import type { ICleaningCoefficient, IRoomType } from '@/types/api/pricelist';

export interface IOrderCtx {
  pricelistByKey: typeof pricelistByKey;
  cleaningType: keyof ICleaningCoefficient | null;
  mainServicesPrice: number;
  additionalServicesPrice: number;
  totalPrice: number;
}

const context: IOrderCtx = {
  pricelistByKey,
  cleaningType: null,
  mainServicesPrice: 0,
  additionalServicesPrice: 0,
  totalPrice: 0,
};

const orderMachine = createMachine<IOrderCtx>(
  {
    predictableActionArguments: true,
    initial: 'inactive',
    states: {
      inactive: {
        on: {
          SELECT_CONDO: {
            target: 'condoSelected',
          },
          SELECT_OFFICE: {
            target: 'officeSelected',
          },
          SELECT_AFTER_REPAIR: {
            target: 'afterRepairSelected',
          },
        },
      },
      condoSelected: {
        tags: ['roomMode'],
        on: {
          SELECT_AFTER_REPAIR: {
            target: 'afterRepairSelected',
          },
          SELECT_OFFICE: {
            target: 'officeSelected',
          },
          SET_CLEANING_TYPE: {
            actions: ['handleCleaningTypeSelection'],
          },
          ALTER_ROOM_BY_KEY: {
            actions: ['alterRoomByKey'],
          },
          UPDATE_ADDITIONAL_SERVICES: {
            actions: ['computeAdditionalServicesPrice'],
          },
        },
      },
      officeSelected: {
        tags: ['squareMode'],
        on: {
          SELECT_CONDO: {
            target: 'condoSelected',
          },
          SELECT_AFTER_REPAIR: {
            target: 'afterRepairSelected',
          },
          SET_CLEANING_TYPE: {
            actions: ['handleCleaningTypeSelection'],
          },
        },
      },
      afterRepairSelected: {
        tags: ['squareMode', 'afterRepair'],
        on: {
          SELECT_CONDO: {
            target: 'condoSelected',
          },
          SELECT_OFFICE: {
            target: 'officeSelected',
          },
          SET_CLEANING_TYPE: {
            actions: ['handleCleaningTypeSelection'],
          },
        },
      },
    },
  },
  {
    actions: {
      handleCleaningTypeSelection: (ctx, event) => {
        // console.log('ORDER ctx', ctx);
        // console.log('ORDER event', event);
        // set initial value on toggle cleaning type
        ctx.totalPrice = ctx.mainServicesPrice =
          ctx.pricelistByKey.initial.cleaning *
          ctx.pricelistByKey.cleaningCoefficient[
            event.key as keyof ICleaningCoefficient
          ];
        ctx.cleaningType = event.key;
      },
      alterRoomByKey: (ctx, ev) => {
        const cleaningCoeff =
          ctx.pricelistByKey.cleaningCoefficient[ctx.cleaningType!];
        const roomPrice =
          ctx.pricelistByKey.roomType[ev.key as keyof IRoomType];
        ctx.mainServicesPrice =
          ctx.mainServicesPrice +
          (ev.shouldIncrease ? roomPrice : -roomPrice) * cleaningCoeff;
      },
      computeAdditionalServicesPrice: (ctx, ev) => {
        console.log('TODO', ev);
      },
    },
  }
);

export const useOrderState = (
  calc: ReturnType<typeof useCalcState>,
  pricelist: typeof pricelistByKey = pricelistByKey
) => {
  const order = useMachine(
    orderMachine.withContext({
      ...context,
      // overwrite with fetched data if exists
      pricelistByKey: pricelist || context.pricelistByKey,
    })
  );

  order.service.subscribe(({ context, event }) => {
    // console.log('ORDER state changed', context);
    // console.log('ORDER state changed', event);
    if (event.type === 'ALTER_ROOM_BY_KEY') {
      // compute the total price
      context.totalPrice =
        context.additionalServicesPrice + context.mainServicesPrice;
    }
  });

  calc.service.subscribe((state) => {
    console.log('calc state changed!!', state.event);
    const { key, services, type } = state.event;

    if (type === 'UPDATE_ADDITIONAL_SERVICES') {
      order.send('UPDATE_ADDITIONAL_SERVICES', { services });
      return;
    }

    if (!key) {
      return;
    }

    if (type === 'SET_SERVICE') {
      switch (key) {
        case 'condo':
          order.send('SELECT_CONDO');
          break;
        case 'office':
          order.send('SELECT_OFFICE');
          break;
        case 'afterRepair':
          order.send('SELECT_AFTER_REPAIR');
          break;
        default:
          throw Error(`The service type key can't be handled "${key}"`);
      }
      return;
    }

    order.send(type, { key });
  });

  return order;
};
