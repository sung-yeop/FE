import AsyncStorage from '@react-native-async-storage/async-storage';
import {allAlarmsSelector, STORAGE_ALARM_KEY} from '../atoms';
import {Alarm} from '../types';
import {useRecoilState} from 'recoil';
import AndroidAlarmModule from '../util/AndroidAlarmManager';
import {Platform} from 'react-native';
import {newAlarmSend, updateAlarmAPI} from '../api/AlarmAPI';

export const useAlarmManager = () => {
  const [alarms, setAlarms] = useRecoilState(allAlarmsSelector);

  const loadAlarms = async () => {
    try {
      const savedAlarms = await AsyncStorage.getItem(STORAGE_ALARM_KEY);
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
      if (Platform.OS === 'android') {
        await AndroidAlarmModule.setAlarm(
          alarm.alarmid,
          alarm.timer.getTime(),
          alarm.setting.isVibration,
          alarm.setting.volume,
          'null',
          alarm.alarmDays,
        );
      }
      const updatedAlarms = [...alarms, alarm];

      // 전역 상태 업데이트
      await AsyncStorage.setItem(
        STORAGE_ALARM_KEY,
        JSON.stringify(updatedAlarms),
      );
      newAlarmSend(alarm); // API를 통해서 저장
      setAlarms(updatedAlarms);
      console.log('Alarm saved successfully:', updatedAlarms);
    } catch (err) {
      console.error('SAVE ALARM ERROR : ', err);
    }
  };

  const updateAlarm = async ({
    alarm,
    repeatTrigger,
  }: {
    alarm: Alarm;
    repeatTrigger?: boolean;
  }) => {
    const alarmInterval = isNaN(Number(alarm.setting.alarmInterval))
      ? 0
      : Number(alarm.setting.alarmInterval);
    try {
      if (Platform.OS === 'android') {
        await AndroidAlarmModule.updateAlarm(
          alarm.alarmid,
          alarm.timer.getTime(),
          alarm.active,
          alarmInterval,
          alarm.delayTimes,
          alarm.setting.isVibration,
          repeatTrigger ? repeatTrigger : false,
          alarm.setting.volume,
          'null',
          alarm.alarmDays,
        );
      }
      const updatedAlarms = alarms.map(a =>
        a.alarmid === alarm.alarmid ? alarm : a,
      );
      await AsyncStorage.setItem(
        STORAGE_ALARM_KEY,
        JSON.stringify(updatedAlarms),
      );
      setAlarms(updatedAlarms);
      updateAlarmAPI(alarm);
      console.log('Alarm updated successfully:', alarm);
      //TODO : 백엔드 업데이트 로직 필요
    } catch (err) {
      console.error('UPDATE ALARM ERROR : ', err);
    }
  };

  const deleteAlarm = async (alarmId: string) => {
    try {
      const updatedAlarms = alarms.filter(alarm => alarm.alarmid !== alarmId);
      await AsyncStorage.setItem(
        STORAGE_ALARM_KEY,
        JSON.stringify(updatedAlarms),
      );
      setAlarms(updatedAlarms);
      console.log('Alarm deleted successfully:', alarmId);
      // 백엔드 삭제 로직 추가
    } catch (error) {
      console.error('Failed to delete alarm:', error);
    }
  };

  const alarmManager = {
    loadAlarms,
    saveAlarm,
    updateAlarm,
    deleteAlarm,
  };

  return alarmManager;
};
