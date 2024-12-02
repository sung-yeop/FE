import {useRecoilValue} from 'recoil';
import {allAlarmsSelector} from '../atoms';

export const useHandleAlldAlarm = () => {
  const allAlarms = useRecoilValue(allAlarmsSelector);

  console.log('useHandleAllAlarm | allAlarms : ', allAlarms);

  const findAlarmUsingId = (id: string) => {
    const find = allAlarms.find(a => a.alarmid === id);
    if (find) return find;
    else console.log('NO ITEM');
  };

  const findAlarmDelayFromAll = allAlarms.filter(alarm => alarm.delay);

  const findAlarmRepeatAllDay = allAlarms.filter(
    alarm => alarm.alarmDays === 127,
  );

  const findAlarmRepeatDay = allAlarms.filter(
    alarm => alarm.alarmDays !== 0 && alarm.alarmDays !== 127,
  );

  return {
    findAlarmUsingId,
    findAlarmDelayFromAll,
    findAlarmRepeatAllDay,
    findAlarmRepeatDay,
  };
};
