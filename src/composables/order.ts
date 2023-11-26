import { useMachine } from '@xstate/vue';
import { createMachine } from 'xstate';
import { pricelistByKey } from './pricelist';
import { useCalcState } from './calc';
import type {
  IAdditionalService,
  ICleaningCoefficient,
  IRoomType,
  ISquarePrice,
} from '@/types/api/pricelist';

export interface IOrderCtx {
  pricelistByKey: typeof pricelistByKey;
  additionalServiceAmountByKey: Record<keyof IAdditionalService, number>;
  squareAmount: number;
  cleaningType: keyof ICleaningCoefficient | null;

  mainServicesPrice: number;
  additionalServicesPrice: number;
  totalPrice: number;
}

const context: IOrderCtx = {
  pricelistByKey,
  // initial additional services amount by key
  additionalServiceAmountByKey: Object.keys(
    pricelistByKey.additionalService
  ).reduce<Record<keyof IAdditionalService, number>>(
    (acc, key) => ({
      ...acc,
      [key]: 0,
    }),
    {}
  ),
  squareAmount: 1,
  cleaningType: null,
  mainServicesPrice: 0,
  additionalServicesPrice: 0,
  totalPrice: 0,
};

const orderMachine = createMachine<IOrderCtx>(
  {
    predictableActionArguments: true,
    initial: 'inactive',
    strict: true,
    states: {
      inactive: {
        on: {
          SET_CONDO: {
            target: 'condoSelected',
          },
          SET_OFFICE: {
            target: 'officeSelected',
          },
          SET_AFTER_REPAIR: {
            target: 'afterRepairSelected',
          },
        },
      },
      condoSelected: {
        tags: ['actualTitles', 'roomMode'],
        entry: (ctx) => {
          // instantiate main price
          ctx.mainServicesPrice = ctx.pricelistByKey.initial.cleaning;
          ctx.totalPrice = ctx.mainServicesPrice;
          // default is `basic`
          ctx.cleaningType = 'basic';
        },
        on: {
          SET_AFTER_REPAIR: {
            target: 'afterRepairSelected',
          },
          SET_OFFICE: {
            target: 'officeSelected',
          },
          SET_CLEANING_TYPE: {
            actions: ['handleCleaningTypeSelection', 'resetAdditionalServices'],
          },
          ALTER_ROOM_BY_KEY: {
            actions: ['alterRoomByKey'],
          },
          UPDATE_ADDITIONAL_SERVICES: {
            actions: [
              'computeAdditionalServiceAmount',
              'computeAdditionalServicesPrice',
            ],
          },
          UPDATE_ADDITIONAL_SERVICE_AMOUNT: {
            actions: [
              'computeAdditionalServiceAmount',
              'computeAdditionalServicesPrice',
            ],
          },
        },
      },
      officeSelected: {
        tags: ['actualTitles', 'squareMode'],
        entry: (ctx) => {
          ctx.mainServicesPrice = ctx.pricelistByKey.square.office.basic;
          Object.keys(ctx.additionalServiceAmountByKey).forEach((key) => {
            // reset values
            ctx.additionalServiceAmountByKey[key] = 0;
          });
        },
        on: {
          SET_CONDO: {
            target: 'condoSelected',
          },
          SET_AFTER_REPAIR: {
            target: 'afterRepairSelected',
          },
          SET_CLEANING_TYPE: {
            actions: ['handleCleaningTypeSelection'],
          },
          UPDATE_ADDITIONAL_SERVICES: {
            actions: [
              'computeAdditionalServiceAmount',
              'computeAdditionalServicesPrice',
            ],
          },
          UPDATE_ADDITIONAL_SERVICE_AMOUNT: {
            actions: [
              'computeAdditionalServiceAmount',
              'computeAdditionalServicesPrice',
            ],
          },
          UPDATE_SQ_METERS: {
            actions: (ctx, ev) => {
              ctx.mainServicesPrice =
                ev.amount * ctx.pricelistByKey.square.office.basic;
            },
          },
        },
      },
      afterRepairSelected: {
        tags: ['actualTitles', 'squareMode', 'afterRepair'],
        entry: (ctx) => {
          ctx.mainServicesPrice = ctx.pricelistByKey.square.repair.empty;
          ctx.additionalServicesPrice = 0;
          Object.keys(ctx.additionalServiceAmountByKey).forEach((key) => {
            // reset values
            ctx.additionalServiceAmountByKey[key] = 0;
          });
        },
        on: {
          SET_CONDO: {
            target: 'condoSelected',
          },
          SET_OFFICE: {
            target: 'officeSelected',
          },
          SET_CLEANING_TYPE: {
            actions: ['handleCleaningTypeSelection'],
          },
          UPDATE_SQ_METERS: {
            actions: (ctx, ev) => {
              ctx.mainServicesPrice =
                ev.amount *
                ctx.pricelistByKey.square.repair[
                  ev.key as keyof ISquarePrice['repair']
                ];
            },
          },
          ALTER_ROOM_TYPE: {
            actions: (ctx, ev) => {
              ctx.totalPrice = ctx.mainServicesPrice =
                ctx.pricelistByKey.square.repair[
                  ev.key as keyof ISquarePrice['repair']
                ];
            },
          },
        },
      },
    },
  },
  {
    actions: {
      handleCleaningTypeSelection: (ctx, event) => {
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
        // TODO refactor, simplify
        if (ev.type === 'UPDATE_ADDITIONAL_SERVICES') {
          if (!ev.services?.length) {
            // nothing selected, reset price
            ctx.additionalServicesPrice = 0;
            return;
          }

          const additionalServiceByKey = ctx.pricelistByKey.additionalService;
          const additionalServiceAmountByKey = ctx.additionalServiceAmountByKey;
          if (ev.services.length === 1) {
            // extract one price
            const [serviceKey] = ev.services;
            const { price } = additionalServiceByKey[serviceKey];
            ctx.additionalServicesPrice =
              price * additionalServiceAmountByKey[serviceKey];
            return;
          }

          ctx.additionalServicesPrice = ev.services
            .map(
              (key: keyof IAdditionalService): number =>
                additionalServiceByKey[key].price *
                additionalServiceAmountByKey[key]
            )
            .reduce((aPrice: number, bPrice: number) => aPrice + bPrice);
        } else {
          const additionalServiceByKey = ctx.pricelistByKey.additionalService;
          ctx.additionalServicesPrice = Object.entries(
            ctx.additionalServiceAmountByKey
          ).reduce<number>((sum, [key, serviceAmount]) => {
            const { price } = additionalServiceByKey[key];
            return (sum += price * serviceAmount);
          }, 0);
        }
      },
      computeAdditionalServiceAmount: (ctx, ev) => {
        // console.log('computeAdditionalServiceAmount ev', ev);
        switch (ev.type) {
          case 'UPDATE_ADDITIONAL_SERVICE_AMOUNT':
            ctx.additionalServiceAmountByKey[ev.key] =
              ctx.additionalServiceAmountByKey[ev.key] +
              (ev.shouldIncrease ? 1 : -1);
            break;
          case 'UPDATE_ADDITIONAL_SERVICES':
            // `services` is a proxy with key as idx and value as actual service key
            // eslint-disable-next-line no-case-declarations
            const selectedServiceKeys: (keyof IAdditionalService)[] =
              Object.values(ev.services);
            // instantiate selected additional services
            selectedServiceKeys.forEach((key) => {
              if (!ctx.additionalServiceAmountByKey[key]) {
                // instantiate values
                ctx.additionalServiceAmountByKey[key] = 1;
              }
            });
            // reset the reset
            Object.keys(ctx.additionalServiceAmountByKey)
              .filter(
                (ctxServiceKey) => !selectedServiceKeys.includes(ctxServiceKey)
              )
              .forEach((key) => {
                ctx.additionalServiceAmountByKey[key] = 0;
              });
            break;
          default:
            throw Error(`The event type is not handled: "${ev.type}"`);
        }
      },
      resetAdditionalServices: (ctx) => {
        Object.keys(ctx.additionalServiceAmountByKey).forEach((key) => {
          ctx.additionalServiceAmountByKey[key] = 0;
        });
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
    if (
      event.type === 'ALTER_ROOM_BY_KEY' ||
      event.type === 'UPDATE_ADDITIONAL_SERVICES' ||
      event.type === 'UPDATE_ADDITIONAL_SERVICE_AMOUNT' ||
      event.type === 'UPDATE_SQ_METERS'
    ) {
      // compute the total price of the services
      context.totalPrice =
        context.additionalServicesPrice + context.mainServicesPrice;
    }
  });

  calc.service.subscribe((state) => {
    // TODO refactor, separate states, simplify
    const { key, services, type } = state.event;

    if (
      type === 'SET_OFFICE' ||
      type === 'SET_AFTER_REPAIR' ||
      type === 'SET_CONDO'
    ) {
      switch (state.value) {
        case 'inactive':
          // do not affect order state
          break;
        case 'condoSelected':
          order.send('SET_CONDO');
          break;
        case 'officeSelected':
          order.send('SET_OFFICE');
          break;
        case 'afterRepairSelected':
          order.send('SET_AFTER_REPAIR');
          break;
        default:
          throw Error(`The service type key can't be handled "${state.value}"`);
      }
    }

    if (type === 'UPDATE_ADDITIONAL_SERVICES') {
      order.send('UPDATE_ADDITIONAL_SERVICES', { services });
      return;
    }

    if (!key) {
      return;
    }

    order.send(type, { key });
  });

  return order;
};
