import {Verification} from '../screens/ReportPage';
import {
  Alarm,
  MissionCareType,
  ReportDuration,
  SeniorInfo,
  SettingTimeInterval,
  SignUpInfo,
  Todo,
} from '../types';

interface BaseAlarmResponse {
  alarmId: string;
  missionName: string;
  alarmTime: string;
  active: boolean;
  alarmDays: number;
  delayTimes: number;
  restrictAlarm: boolean;
  isVibration: boolean;
  volume: number;
  alarmInterval: number;
  createdByGuardian: boolean;
}

interface ResponseAlarmTypeGuardian extends BaseAlarmResponse {
  username: string;
  phoneNumber: string;
  name: string;
  restrictAlarm: boolean; // boolean으로 특정
}

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

  static parseAlarmForm(savedValue: BaseAlarmResponse[]): Alarm[] {
    return savedValue.map(item => this.#parseAlarmItem(item));
  }

  static #parseAlarmItem(target: BaseAlarmResponse): Alarm {
    const filteredTimeString = target.alarmTime + 'Z';

    return {
      alarmid: target.alarmId,
      timer: new Date(filteredTimeString),
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

  static parseAlarmFormGuardian(
    savedValue: ResponseAlarmTypeGuardian[],
  ): Alarm[] {
    return savedValue.map(item => this.#parseAlarmItemGuardian(item));
  }

  static #parseAlarmItemGuardian(target: ResponseAlarmTypeGuardian): Alarm {
    const filteredTimeString = target.alarmTime + 'Z';

    return {
      alarmid: target.alarmId,
      username: {
        name: target.name,
        phoneNumber: Number(target.phoneNumber),
        username: target.username,
      } as SeniorInfo,
      timer: new Date(filteredTimeString),
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

  static parseDateToYMD(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  static parseYMDtoMD(date: Date): string {
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  }

  static parseReportDurationForm(savedValue: ReportDuration): {
    startDate: string;
    endDate: string;
  } {
    const today = new Date();
    let startDate: Date;
    let endDate: Date = today;

    switch (savedValue) {
      case 'Today':
        startDate = today;
        break;
      case 'Week':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay() + 1);
        break;
      case 'Month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      default:
        if (typeof savedValue === 'object') {
          startDate = savedValue.startDay;
          endDate = savedValue.endDay;
        } else {
          throw new Error('Invalid ReportDuration value');
        }
    }

    return {
      startDate: Parser.parseDateToYMD(startDate),
      endDate: Parser.parseDateToYMD(endDate),
    };
  }

  static parseChartFormFromAPI(data: Verification[]) {
    const labels = this.#extractLabels(data);
    const averagedDatas = this.#filterDataWithLabels({
      labels: labels,
      data: data,
    });
    console.log('A : ', averagedDatas);
    return averagedDatas;
  }
  static #extractLabels(data: Verification[]) {
    const result = new Set(
      data.map(item =>
        Parser.parseYMDtoMD(new Date(item.verificationDateTime)),
      ),
    );
    return Array.from(result);
  }

  static #filterDataWithLabels({
    labels,
    data,
  }: {
    labels: string[];
    data: Verification[];
  }) {
    return labels.map(label => {
      const matchingData = data.filter(
        item =>
          Parser.parseYMDtoMD(new Date(item.verificationDateTime)) === label,
      );

      const average =
        matchingData.length > 0
          ? matchingData.reduce((sum, item) => sum + item.value, 0) /
            matchingData.length
          : 0;

      return {
        label,
        value: average,
      };
    });
  }
}
