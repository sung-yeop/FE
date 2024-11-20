import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alarm} from '../types';

export class GuardianAPI {
  static async getSeniors() {
    try {
      const token = await AsyncStorage.getItem('token');
      const guardianName = await AsyncStorage.getItem('username');
      const response = await fetch(
        `http://10.0.2.2:8080/guardian/${guardianName}/users`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('[GET] 유저를 정상적으로 불러오지 못했습니다.');
      }
      return response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  /**
   *
   * @returns 보호자가 관리하고자하는 시니어를 추가하는 API
   */
  static async addSenior(phoneNumber: string) {
    try {
      const token = await AsyncStorage.getItem('token');
      const guardianName = await AsyncStorage.getItem('username');
      console.log(guardianName);
      const response = await fetch('http://10.0.2.2:8080/guardian/addUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          guardianName: guardianName,
          userPhoneNumber: phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('[POST] 유저를 정상적으로 추가하지 못했습니다.');
      }
    } catch (err) {
      console.error('리포트 POST 에러 : ', err);
      throw err;
    }
  }

  static async addAlarm({alarm}: {alarm: Alarm}) {
    try {
      const token = await AsyncStorage.getItem('token');
      const guardianName = await AsyncStorage.getItem('username');
      const username = alarm.username?.username;

      if (!username) {
        throw new Error(
          '시니어의 아이디가 API로 전달되지 않았습니다. 알람 세팅(alarm.username)을 다시 확인해주세요!',
        );
      }

      const response = await fetch(
        `http://10.0.2.2:8080/guardian/${guardianName}/user/${username}/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            alarmId: alarm.alarmid,
            username: guardianName,
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
        },
      );

      console.log('Response : ', response);

      if (!response.ok) {
        throw new Error('[POST] 알람이 정상적으로 저장되지 않았습니다!');
      }

      return await response.json();
    } catch (err) {
      console.error('가디언 -> 시니어 알람 설정 오류', err);
      throw err;
    }
  }
  static async updateAlarm({alarm}: {alarm: Alarm}) {
    try {
      const token = await AsyncStorage.getItem('token');
      const guardianName = await AsyncStorage.getItem('username');
      const username = alarm.username?.username;
      if (!username) {
        throw new Error(
          '시니어의 아이디가 API로 전달되지 않았습니다. 알람 세팅(alarm.username)을 다시 확인해주세요!',
        );
      }

      const response = await fetch(
        `http://10.0.2.2:8080/guardian/${guardianName}/user/${username}/alarms/update`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            alarmId: alarm.alarmid,
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
        },
      );

      console.log('GuardianAPI - UpdateAlarm Log : ', response.status);

      if (!response.ok) {
        throw new Error('[POST] 알람이 정상적으로 업데이트되지 않았습니다!');
      }

      return await response.json();
    } catch (err) {
      console.error('가디언 -> 시니어 알람 설정 오류', err);
      throw err;
    }
  }

  static async getAlarms(username: string) {
    try {
      const token = await AsyncStorage.getItem('token');
      const guardianName = await AsyncStorage.getItem('username');

      const response = await fetch(
        `http://10.0.2.2:8080/guardian/${guardianName}/user/${username}/alarms`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('GuardianAPI - GetAlarms Log : ', response.status);

      if (!response.ok) {
        throw new Error('[POST] 알람이 정상적으로 업데이트되지 않았습니다!');
      }
      const result = await response.text();

      return await JSON.parse(result);
    } catch (err) {
      console.error('가디언 -> 시니어 알람 설정 오류', err);
      throw err;
    }
  }
}
