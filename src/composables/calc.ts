import type { ICleaningCoefficient, ISquarePrice } from '@/types/api/pricelist';
import { useMachine } from '@xstate/vue';
import { createMachine } from 'xstate';

export interface ICalc {
  isCleaningSectionEnabled: boolean;
  cleaningType: null | keyof ICleaningCoefficient;
  roomType: null | keyof ISquarePrice['repair'];
  isRoomSectionEnabled: boolean;
  isAdditionalSectionEnabled: boolean;
  shouldAllRoomsBeSelected: boolean;
}

const context: ICalc = {
  isCleaningSectionEnabled: false,
  cleaningType: null,
  roomType: null,
  isRoomSectionEnabled: false,
  isAdditionalSectionEnabled: false,
  shouldAllRoomsBeSelected: false,
};

/** Calculator state manager */
export const calcMachine = createMachine<ICalc>(
  {
    id: 'calculator',
    initial: 'inactive',
    predictableActionArguments: true,
    context,
    states: {
      inactive: {
        on: {
          SET_CONDO: {
            target: 'condoSelected',
            actions: ['handleCleaningRoomTypeSelection'],
          },
          SET_OFFICE: { target: 'officeSelected' },
          SET_AFTER_REPAIR: { target: 'afterRepairSelected' },
        },
      },
      condoSelected: {
        entry: (ctx) => {
          // all rooms selected by default
          ctx.shouldAllRoomsBeSelected = true;
          ctx.isCleaningSectionEnabled = true;
          ctx.isRoomSectionEnabled = true;
          ctx.isAdditionalSectionEnabled = true;
        },
        on: {
          SET_OFFICE: { target: 'officeSelected' },
          SET_AFTER_REPAIR: { target: 'afterRepairSelected' },
          SET_CLEANING_TYPE: { actions: ['handleCleaningRoomTypeSelection'] },
        },
      },
      officeSelected: {
        entry: (ctx) => {
          ctx.isCleaningSectionEnabled = false;
          ctx.isRoomSectionEnabled = false;
          ctx.isAdditionalSectionEnabled = true;
        },
        on: {
          SET_CONDO: {
            target: 'condoSelected',
          },
          SET_AFTER_REPAIR: { target: 'afterRepairSelected' },
        },
      },
      afterRepairSelected: {
        entry: (ctx) => {
          ctx.isCleaningSectionEnabled = false;
          ctx.isRoomSectionEnabled = true;
          ctx.isAdditionalSectionEnabled = false;
          ctx.roomType = 'empty';
        },
        on: {
          SET_CONDO: {
            target: 'condoSelected',
          },
          SET_OFFICE: { target: 'officeSelected' },
          ALTER_ROOM_TYPE: {
            actions: (ctx, ev) => {
              ctx.roomType = ev.key;
            },
          },
        },
      },
    },
  },
  {
    actions: {
      handleCleaningRoomTypeSelection: (
        ctx,
        { key: cleaningType = 'basic' }
      ) => {
        // all room types should be selected in any case
        ctx.shouldAllRoomsBeSelected = true;
        ctx.cleaningType = cleaningType;
      },
    },
  }
);

export const useCalcState = () => {
  const calc = useMachine(calcMachine);

  return calc;
};
