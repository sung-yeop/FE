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
  guardianPhoneNumber: number;
}) => {
  try {
    const response = await fetch('http://10.0.2.2:8080/user/join', {
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

    console.log(data);
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
    const response = await fetch('http://10.0.2.2:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      throw new Error('로그인에 실패했습니다.');
    }

    const token = response.headers.get('Authorization');

    if (token) {
      const actualToken = token.replace('Bearer ', '');
      await AsyncStorage.setItem('token', actualToken);
      return actualToken;
    }

    const token2 = await AsyncStorage.getItem('token');
    console.log(token2);

    throw new Error('토큰이 없습니다.');
  } catch (error) {
    console.error('로그인 에러:', error);
    throw error;
  }
};

export const newAlarmSend = async (alarm: Alarm) => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('알람 : ', token);

    const response = await fetch('http://10.0.2.2:8080/alarm/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // JWT 토큰 추가
      },
      body: JSON.stringify({
        alarmId: alarm.alarmid,
        username: 'qwerqwer',
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
