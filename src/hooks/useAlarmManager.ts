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
    console.log('Target Alarm : ', alarm.timer);
    try {
      if (Platform.OS === 'android') {
        await AndroidAlarmModule.setAlarm(
          alarm.alarmid,
          Number(alarm.timer.getTime()),
          alarm.setting.isVibration,
          alarm.setting.volume,
          'null',
          alarm.alarmDays,
        );
      }
      const updatedAlarms = [...alarms, alarm];

      console.log('UPDATEDALARM : ', updatedAlarms);
      newAlarmSend(alarm);

      await AsyncStorage.setItem(
        STORAGE_ALARM_KEY,
        JSON.stringify(updatedAlarms),
      );

      setAlarms(updatedAlarms);
      console.log('Alarm saved successfully:', alarm);
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
          Number(alarm.timer.getTime()),
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
    } catch (err) {
      console.error('UPDATE ALARM ERROR : ', err);
    }
  };

  const deleteAlarm = async (alarm: Alarm) => {
    console.log('Delete Alarm', alarm);
    try {
      const updatedAlarms = alarms.filter(a => a.alarmid !== alarm.alarmid);
      await AsyncStorage.setItem(
        STORAGE_ALARM_KEY,
        JSON.stringify(updatedAlarms),
      );
      setAlarms(updatedAlarms);

      if (Platform.OS === 'android') {
        AndroidAlarmModule.cancelAlarm(alarm.alarmid);
      }
      updateAlarmAPI(alarm);

      console.log('Alarm deleted successfully:', alarm.alarmid);
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
