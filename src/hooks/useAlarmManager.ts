import AsyncStorage from '@react-native-async-storage/async-storage';
import {allAlarmsSelector, STORAGE_KEY} from '../atoms';
import {Alarm} from '../types';
import {useRecoilState} from 'recoil';
import {useMemo} from 'react';

export const useAlarmManager = () => {
  const [alarms, setAlarms] = useRecoilState(allAlarmsSelector);

  const loadAlarms = async () => {
    try {
      AsyncStorage.clear();
      const savedAlarms = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedAlarms) {
        setAlarms(JSON.parse(savedAlarms) as Alarm[]);
      } else {
        setAlarms([]);
      }
    } catch (err) {
      console.log('LOAD ALARMS ERROR: ', err);
    }
  };

  const saveAlarm = async (alarm: Alarm) => {
    try {
      const updatedAlarms = [...alarms, alarm];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAlarms));
      setAlarms(updatedAlarms);
      console.log('Alarm saved successfully:', alarm);
      //TODO : 백엔드 저장 로직 필요
    } catch (err) {
      console.error('SAVE ALARM ERROR : ', err);
    }
  };

  const updateAlarm = async (alarm: Alarm) => {
    try {
      const updatedAlarms = alarms.map(a => (a.id === alarm.id ? alarm : a));
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAlarms));
      setAlarms(updatedAlarms);
      console.log('Alarm updated successfully:', alarm);
      //TODO : 백엔드 업데이트 로직 필요
    } catch (err) {
      console.error('UPDATE ALARM ERROR : ', err);
    }
  };

  const deleteAlarm = async (alarmId: string) => {
    try {
      const updatedAlarms = alarms.filter(alarm => alarm.id !== alarmId);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAlarms));
      setAlarms(updatedAlarms);
      console.log('Alarm deleted successfully:', alarmId);
      // 백엔드 삭제 로직 추가
    } catch (error) {
      console.error('Failed to delete alarm:', error);
    }
  };

  // 이거때매 개고생
  // const alarmManager = useMemo(
  //   () => ({
  //     loadAlarms,
  //     saveAlarm,
  //     updateAlarm,
  //     deleteAlarm,
  //   }),
  //   [alarms], // alarms가 변경될 때만 새 객체 생성
  // );

  const alarmManager = {
    loadAlarms,
    saveAlarm,
    updateAlarm,
    deleteAlarm,
  };

  return alarmManager;
};
