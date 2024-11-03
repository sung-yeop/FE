import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alarm} from '../types';

export const sendSignUpData = async ({
  username,
  name,
  phoneNumber,
  isGuardian,
  guardianPhoneNumber,
  password,
}: {
  username: string;
  name: string;
  password: string;
  phoneNumber: string;
  isGuardian: boolean;
  guardianPhoneNumber: number | undefined;
}) => {
  try {
    const response = await fetch('YOUR_API_ENDPOINT/user/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        name: name,
        password: password,
        phoneNumber: phoneNumber,
        isGuardian: isGuardian,
        guardianPhoneNumber: guardianPhoneNumber,
      }),
    });

    if (!response.ok) {
      throw new Error('회원가입에 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('회원가입 에러:', error);
    throw error;
  }
};

export const sendSignInData = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await fetch('YOUR_API_ENDPOINT/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('로그인에 실패했습니다.');
    }

    const data = await response.json();

    if (data.token) {
      AsyncStorage.setItem('token', data.token);
      console.log();
      return data.token;
    }

    throw new Error('토큰이 없습니다.');
  } catch (error) {
    console.error('로그인 에러:', error);
    throw error;
  }
};

export const newAlarmSend = async (alarm: Alarm) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await fetch('YOUR_API_ENDPOINT/alarm/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // JWT 토큰 추가
      },
      body: JSON.stringify({
        alarmId: alarm.alarmid,
        userId: token,
        title: '임시 타이틀 - 이거 필요 없는듯',
        timer: alarm.timer,
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
