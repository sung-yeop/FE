import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alarm} from '../types';
import AlarmListHeader from '../components/AlarmPageComponents/AlarmListHeader';

export class GuardianAPI {
  /**
   *
   * @returns 보호자가 관리하고자하는 시니어를 추가하는 API
   */
  static async addSenior() {
    try {
      const token = await AsyncStorage.getItem('token');
      const guardianName = await AsyncStorage.getItem('username');

      //url 수정 필요
      const response = await fetch('http://10.0.2.2:8080/verification/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('[POST] 리포트를 제대로 불러오지 못했습니다.');
      }
      const jsonData = JSON.parse(await response.text());
      console.log('Parsed JSON data:', jsonData);

      return jsonData;
    } catch (err) {
      console.error('리포트 POST 에러 : ', err);
      throw err;
    }
  }

  static async addAlarm({alarm}: {alarm: Alarm}) {
    try {
      const token = await AsyncStorage.getItem('token');
      const guardianName = await AsyncStorage.getItem('username');
      const username = alarm.username;
      if (!username) {
        throw new Error(
          '시니어의 아이디가 API로 전달되지 않았습니다. 알람 세팅(alarm.username)을 다시 확인해주세요!',
        );
      }

      console.log('USERNAME : ', username);
      console.log('GuardianName : ', guardianName);

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
        },
      );

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
      const username = alarm.username;
      if (!username) {
        throw new Error(
          '시니어의 아이디가 API로 전달되지 않았습니다. 알람 세팅(alarm.username)을 다시 확인해주세요!',
        );
      }

      const response = await fetch(
        `http://10.0.2.2:8080/guardian/${guardianName}/user/${username}/alarms/update`,
        {
          method: 'POST',
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
        },
      );

      if (!response.ok) {
        throw new Error('[POST] 알람이 정상적으로 업데이트되지 않았습니다!');
      }

      return await response.json();
    } catch (err) {
      console.error('가디언 -> 시니어 알람 설정 오류', err);
      throw err;
    }
  }
}
