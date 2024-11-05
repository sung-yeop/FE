export const TimeFormatting = (date: Date) => {
  const hour = date.getHours();
  const viewHour = hour >= 12 ? hour - 12 : hour;
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? '오후' : '오전';
  const viewTime = `${String(viewHour).padStart(2, '0')}:${String(
    minute,
  ).padStart(2, '0')}`;
  return {ampm, viewTime};
};
