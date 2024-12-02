import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {Alarm, MissionCareType, MissionMode} from '../../types';
import uuid from 'react-native-uuid';

type Props = {
  children: ReactNode;
  initial: Alarm | undefined;
};

interface AlarmContextType {
  current: Alarm;
  updateAlarm: (updates: Partial<Alarm>) => void;
  updateMission: (
    newSetting: Partial<{
      mode: MissionMode;
      id: MissionCareType;
    }>,
  ) => void;
}

export const AlarmContextManage = createContext<AlarmContextType | undefined>(
  undefined,
);

const defaultMission = {
  mode: 'Free' as MissionMode,
  id: undefined,
};

const AlarmContext = ({children, initial}: Props) => {
  const defaultAlarm: Alarm = {
    alarmid: uuid
      .v4()
      .toString()
      .replace(/[^\d]+/g, '')
      .slice(0, 9),
    // alarmid: '1',
    timer: new Date(),
    active: false,
    alarmDays: 0,
    mission: defaultMission,
    delay: false,
    disabled: false,
    delayTimes: 0,
    setting: {isVibration: false, volume: 50, alarmInterval: 0},
    createdByGuardian: false,
  };
  console.log('AlarmContext | initial : ', initial);
  const [current, setCurrentAlarm] = useState<Alarm>(initial || defaultAlarm);

  const updateAlarm = (updates: Partial<Alarm>) => {
    setCurrentAlarm(prev => ({...prev, ...updates}));
  };

  console.log('알람 아이디 : ', current.alarmid);

  const updateMission = (
    newSetting: Partial<{
      id: MissionCareType;
      mode: MissionMode;
    }>,
  ) => {
    const updateSet = current.mission
      ? {...current.mission, ...newSetting}
      : {...defaultMission, ...newSetting};
    updateAlarm({mission: updateSet});
  };

  return (
    <AlarmContextManage.Provider value={{current, updateAlarm, updateMission}}>
      {children}
    </AlarmContextManage.Provider>
  );
};

export default AlarmContext;
