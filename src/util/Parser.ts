import {Alarm, MissionCareType, SettingTimeInterval, Todo} from '../types';

type ResponseAlarmType = {
  alarmId: string;
  username: string | null;
  missionName: string;
  alarmTime: string;
  active: boolean;
  alarmDays: number;
  delayTimes: number;
  restrictAlarm: string;
  isVibration: boolean;
  volume: number;
  alarmInterval: number;
  createdByGuardian: boolean;
};

export class Parser {
  static parseTodoForm(savedValue: string): Todo[] | Alarm[] {
    try {
      const parsedData = JSON.parse(savedValue);

      if (!Array.isArray(parsedData)) {
        return [];
      }

      return parsedData.map(data => ({
        ...data,
        timer: new Date(data.timer),
      }));
    } catch (error) {
      console.error('Error parsing alarms:', error);
      return [];
    }
  }

  static parseAlarmForm(savedValue: ResponseAlarmType[]): Alarm[] {
    return savedValue.map(item => this.parseAlarmItem(item));
  }

  static parseAlarmItem(target: ResponseAlarmType): Alarm {
    return {
      alarmid: target.alarmId,
      timer: new Date(target.alarmTime),
      active: target.active,
      alarmDays: target.alarmDays,
      delay: false,
      delayTimes: target.delayTimes,
      mission: {
        mode: target.restrictAlarm ? 'Strict' : 'Free',
        id: target.missionName as MissionCareType,
      },
      setting: {
        isVibration: target.isVibration,
        volume: target.volume,
        alarmInterval: target.alarmInterval as SettingTimeInterval,
      },
      createdByGuardian: target.createdByGuardian,
    };
  }
}
