import {Alarm, MissionCareType, MissionMode, ReportAPI} from '../types';

export const TestMockData: {
  alarmWithMission: Alarm;
  signUpInfo: any;
  reportSend: ReportAPI;
} = {
  alarmWithMission: {
    alarmid: '1',
    timer: new Date(),
    active: false,
    alarmDays: 0,
    mission: {
      mode: 'Free' as MissionMode,
      id: 'Eat Food' as MissionCareType,
    },
    delay: false,
    delayTimes: 0,
    setting: {isVibration: false, volume: 50, alarmInterval: 1},
  },
  signUpInfo: {
    username: 'qwerqwer',
    password: 'qwer1234',
    name: 'abcdefg',
    phoneNumber: '01012341234',
  },
  reportSend: {
    mission: 'Eat Food' as MissionCareType,
    startDate: '2024-11-01',
    endDate: '2024-11-05',
  },
};
