import {useRecoilState} from 'recoil';
import {allAlarmsSelector, allManagingSeniorsSelector} from '../atoms';
import {Alarm} from '../types';
import {GuardianAPI} from '../api/GuardianAPI';

// useGuardianManager.ts
export const useGuardianManager = () => {
  // 시니어 추가 메서드도 useGuardianManager에서 제공 예정
  const [seniors, setSeniors] = useRecoilState(allManagingSeniorsSelector);
  const [allAlarms, updateAlarms] = useRecoilState(allAlarmsSelector);

  const saveGuardianAlarm = async (alarm: Alarm) => {
    GuardianAPI.addAlarm({alarm: alarm});
    updateAlarms(prev => [...prev, alarm]);
  };

  const updateGuardianAlarm = async (alarm: Alarm) => {
    GuardianAPI.updateAlarm({alarm: alarm});
    updateAlarms(prev =>
      prev.map(a => (a.alarmid === alarm.alarmid ? alarm : a)),
    );
  };

  return {saveGuardianAlarm, updateGuardianAlarm};
};
