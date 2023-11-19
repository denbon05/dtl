import { createMachine } from 'xstate';

export enum CalcState {}

const calcMachine = createMachine({
  id: 'calculator',
});
