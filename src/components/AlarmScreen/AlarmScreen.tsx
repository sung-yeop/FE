import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useHandleAlldAlarm} from '../../hooks/useHandleAllAlarm';
import AlarmContext from '../AlarmPageComponents/AlarmContext';
import AlarmScreenMissionItem from './AlarmScreenMissionItem';
import AlarmScreenAction from './AlarmScreenAction';

type RootStackParamList = {
  Bottom: undefined;
  AlarmScreen: {alarmId: string};
};

type AlarmScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AlarmScreen'
>;

const AlarmScreen = ({route}: AlarmScreenProps) => {
  const {alarmId} = route.params;
  const {findAlarmUsingId} = useHandleAlldAlarm();
  const current = findAlarmUsingId(alarmId);

  return (
    <AlarmContext initial={current}>
      <AlarmScreenMissionItem missionId={current?.mission.id} />
      <AlarmScreenAction />
    </AlarmContext>
  );
};

export default AlarmScreen;

const styles = StyleSheet.create({});
