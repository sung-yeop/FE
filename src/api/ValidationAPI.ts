import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alarm} from '../types';

export const validationSend = async (alarm: Alarm) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const username = await AsyncStorage.getItem('username');
    const response = await fetch('http://10.0.2.2:8080/verification/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        alarmId: alarm.alarmid,
        username: username,
        verificationDateTime: alarm.timer,
        value: 1,
      }),
    });

    if (!response.ok) {
      throw new Error('인증 과정에 문제가 있습니다.');
    }

    return await response.json();
  } catch (err) {
    console.error('Verification 에러 : ', err);
    throw err;
  }
};
