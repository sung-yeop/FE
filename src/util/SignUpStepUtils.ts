import {StepKey} from '../types';

export const StepToStepKey = (step: number): StepKey => {
  switch (step) {
    case 1:
      return 'step1' as StepKey;
    case 2:
      return 'step2' as StepKey;
    case 3:
      return 'step3' as StepKey;
    case 4:
      return 'step4' as StepKey;
    case 5:
      return 'step5' as StepKey;
    case 6:
      return 'step6' as StepKey;
    default:
      return 'step1' as StepKey;
  }
};
