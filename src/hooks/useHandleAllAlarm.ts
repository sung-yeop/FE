import {useRecoilState, useRecoilValue} from 'recoil';
import {allAlarmsSelector} from '../atoms';

export const useHandleAlldAlarm = () => {
  const allAlarms = useRecoilValue(allAlarmsSelector);

  const findAlarmUsingId = (id: string) => {
    const find = allAlarms.find(a => a.alarmid === id);
    if (find) return find;
    else console.log('NO ITEM');
  };

  const findAlarmDelayFromAll = allAlarms.filter(alarm => alarm.delay);

  const findAlarmRepeatAllDay = allAlarms.filter(
    alarm =>
      Object.entries(alarm.alarmDays).filter(
        ([k, v]) => k !== 'once' && v === true,
      ).length === 7,
  );

  const findAlarmRepeatDay = allAlarms.filter(alarm => {
    const newEntries = Object.entries(alarm.alarmDays).filter(
      ([k, v]) => k !== 'once' && v === true,
    );
    return newEntries.length !== 7 && newEntries.length > 0;
  });

  return {
    findAlarmUsingId,
    findAlarmDelayFromAll,
    findAlarmRepeatAllDay,
    findAlarmRepeatDay,
  };
};
