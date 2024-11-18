export interface SignUpInfo {
  username: string;
  password: string;
  validPassword: string;
  notificationNumber: string;
  name: string;
  phoneNumber: string;
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

export type StepKey = 'step1' | 'step2' | 'step3' | 'step4' | 'step5';

export interface Alarm {
  alarmid: string;
  timer: Date;
  active: boolean;
  alarmDays: number;
  delay: boolean;
  delayTimes: number;
  username?: SeniorInfo; // Guardian이 생성했을 경우 사용자의 username을 제공해야함
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

export type SettingTimeInterval = 0 | 1 | 10 | 15 | 30;

export type MissionCareType =
  | 'Manage blood sugar'
  | 'Manage blood pressure'
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
  duration: ReportDuration | undefined;
};

export interface Todo {
  id: string;
  title: string;
  description?: string;
  timer: Date;
  day: string;
}

export type ReportAPI = {
  mission: MissionCareType;
  startDate: string;
  endDate: string;
};

export type SeniorInfo = {
  name: string;
  phoneNumber: number;
  username: string;
};
