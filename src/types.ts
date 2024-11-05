export interface SignUpInfo {
  username: string;
  password: string;
  validPassword: string;
  notificationNumber: string;
  name: string;
  phoneNumber: string;
  guardianPhoneNumber: string | undefined;
  isGuardian: boolean;
}

export interface User {
  id: string;
  name: string;
}

export type DayKey =
  | 'once'
  | 'mon'
  | 'tue'
  | 'wed'
  | 'thu'
  | 'fri'
  | 'sat'
  | 'sun';

export type RepeatState = {
  [key in DayKey]: boolean;
};

export interface LoginResponse {
  token: string;
  user: User;
}

export type Step = {
  [key in StepKey]: boolean;
};

export type StepKey = 'step1' | 'step2' | 'step3' | 'step4' | 'step5' | 'step6';

export interface Alarm {
  alarmid: string;
  timer: Date;
  active: boolean;
  alarmDays: number;
  delay: boolean;
  delayTimes: number;
  mission: {
    mode: MissionMode;
    id: MissionCareType;
  };
  setting: {
    isVibration: boolean;
    volume: number;
    alarmInterval: SettingTimeInterval;
  };
}

export type MissionMode = 'Strict' | 'Free';

export type SelectList = 'Alarm' | 'Mission';

export type SettingTimeInterval = '반복 없음' | 1 | 10 | 15 | 30;

export type MissionCareType =
  | 'Manage blood sugar'
  | 'Eat Medician'
  | 'Eat food'
  | undefined;

export type ReportCustomDuration = {
  startDay: Date;
  endDay: Date;
};

export type ReportDuration = 'Today' | 'Week' | 'Month' | ReportCustomDuration;

export type Report = {
  mission: MissionCareType;
  duration: ReportDuration;
};

// ** Todo와 Alarm의 타입에서 timer라는 속성은 동일하게 가지고 있어야한다.
// TimePicker 컴포넌트에서 value에 참조하는값이 .timer이므로 동일해야함
export interface Todo {
  id: string;
  title: string;
  description?: string;
  timer: Date;
  day?: string; // day 혹은 repeat 중 하나는 무조건 존재해야 알려줘 페이지에 등록됨
}

export type ReportAPI = {
  mission: MissionCareType;
  startDate: string;
  endDate: string;
};
