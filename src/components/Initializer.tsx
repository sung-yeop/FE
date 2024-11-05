import {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {allAlarmsState, loadAlarms} from '../atoms';
import {useAlarmManager} from '../hooks/useAlarmManager';
import {useCurrentAlarm} from '../hooks/useCurrentAlarm';
import {Alarm} from '../types';

const Initializer = () => {
  const alarmManager = useAlarmManager();

  useEffect(() => {
    alarmManager.loadAlarms();
  }, []);
  return null;
};

export default Initializer;
