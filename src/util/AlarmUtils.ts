export const ChangeRepeatStateToDayTitle = (selectDays: string[]) => {
  return selectDays
    .map(day => {
      switch (day) {
        case 'mon':
          return '월';
        case 'tue':
          return '화';
        case 'wed':
          return '수';
        case 'thu':
          return '목';
        case 'fri':
          return '금';
        case 'sat':
          return '토';
        case 'sun':
          return '일';
        default:
          null;
      }
    })
    .filter(day => day !== undefined);
};
