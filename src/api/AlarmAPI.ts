import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alarm} from '../types';

export const newAlarmSend = async (alarm: Alarm) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const username = await AsyncStorage.getItem('username');
    const response = await fetch('http://10.0.2.2:8080/alarm/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        alarmId: alarm.alarmid,
        username: username,
        alarmTime: alarm.timer,
        active: alarm.active,
        alarmDays: alarm.alarmDays,
        delayTimes: alarm.delayTimes,
        restrictAlarm: alarm.mission.mode,
        missionName: alarm.mission.id,
        isVibration: alarm.setting.isVibration,
        volume: alarm.setting.volume,
        alarmInterval: alarm.setting.alarmInterval,
      }),
    });

    if (!response.ok) {
      throw new Error('알람 저장에 실패했습니다.');
    }

    return await response.json();
  } catch (err) {
    console.error('알람 저장 에러 : ', err);
    throw err;
  }
};

export const updateAlarmAPI = async (alarm: Alarm) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const username = await AsyncStorage.getItem('username');
    const response = await fetch('http://10.0.2.2:8080/alarm/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        alarmId: alarm.alarmid,
        username: username,
        missionName: alarm.mission.id,
        alarmTime: alarm.timer,
        active: alarm.active,
        alarmDays: alarm.alarmDays,
        delayTimes: alarm.delayTimes,
        restrictAlarm: alarm.mission.mode,
        isVibration: alarm.setting.isVibration,
        volume: alarm.setting.volume,
        alarmInterval: alarm.setting.alarmInterval,
      }),
    });

    if (!response.ok) {
      throw new Error('알람 업데이트에 실패했습니다.');
    }

    return await response.json();
  } catch (err) {
    console.error('알람 저장 에러 : ', err);
    throw err;
  }
};

export const getAlarms = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const username = await AsyncStorage.getItem('username');
    const response = await fetch(`http://10.0.2.2:8080/alarm/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.text();

    console.log('API 호출로 받아온 알람 데이터 : ', JSON.parse(result));

    if (!response.ok) {
      throw new Error(`[GET] 알람 로드에 실패했습니다. : ${response.status}`);
    }

    return await JSON.parse(result);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
