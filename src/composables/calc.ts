import type { IServiceCoefficient } from '@/types/api/pricelist';
import { useMachine } from '@xstate/vue';
import { createMachine } from 'xstate';

export interface ICalc {
  selectedBuildingType: keyof IServiceCoefficient | null;
  isCleaningSectionEnabled: boolean;
  shouldCleaningBeAccurate: boolean;
  isRoomSectionEnabled: boolean;
  isAdditionalSectionEnabled: boolean;
  shouldAllRoomsBeSelected: boolean;
}

const context: ICalc = {
  selectedBuildingType: null,
  isCleaningSectionEnabled: false,
  shouldCleaningBeAccurate: false,
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
          SET_SERVICE: {
            actions: ['handleBuildingSelection'],
            target: 'buildingSelected',
          },
        },
      },
      buildingSelected: {
        tags: ['enabledCleaningType'],
        on: {
          SET_ROOM_TYPE: {
            actions: ['handleCleaningTypeSelection'],
          },
          SET_SERVICE: {
            actions: ['handleBuildingSelection'],
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
      handleBuildingSelection: (ctx, { key }) => {
        console.log('handleBuildingSelection', { key });
        switch (key) {
          case 'condo':
            ctx.isAdditionalSectionEnabled = true;
            ctx.isCleaningSectionEnabled = true;
            ctx.isRoomSectionEnabled = true;
            break;
          case 'office':
            ctx.isAdditionalSectionEnabled = true;
            ctx.isCleaningSectionEnabled = true;
            ctx.isRoomSectionEnabled = false;
            break;
          case 'afterRepair':
            ctx.isAdditionalSectionEnabled = true;
            ctx.isCleaningSectionEnabled = true;
            ctx.isRoomSectionEnabled = false;
            break;
          default:
            throw Error(`The service type key can't be handled "${key}"`);
        }
        ctx.selectedBuildingType = key;
      },

      handleCleaningTypeSelection: (ctx, { key }) => {
        switch (key) {
          case 'basic':
            ctx.shouldAllRoomsBeSelected = true;
            break;
          case 'accurate':
            ctx.shouldAllRoomsBeSelected = true;
            break;
          default:
            throw Error(`The room type can't be handled "${key}"`);
        }
        ctx.shouldCleaningBeAccurate = key === 'accurate';
      },
    },
  }
);

export const useCalcState = () => {
  const calc = useMachine(calcMachine);

  // calc.service.subscribe((state) => {
  // });

  return calc;
};
