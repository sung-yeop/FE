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

export const TimeFormattingForSendingAPI = (time: Date) => {
  return time.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const TimeFormattingResponseFromAPI = (time: String) => {
  const [hours, minutes, seconds] = time.split(':');
  const date = new Date();

  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));
  date.setSeconds(Number(seconds));

  return date;
};
