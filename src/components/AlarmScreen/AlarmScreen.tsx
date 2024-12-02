import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useHandleAlldAlarm} from '../../hooks/useHandleAllAlarm';
import AlarmContext from '../AlarmPageComponents/AlarmContext';
import AlarmScreenMissionItem from './AlarmScreenMissionItem';
import AlarmScreenAction from './AlarmScreenAction';
import {VerificationAPI} from '../../api/VerificationAPI';

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

  const alertFirstTime = async () => {
    await VerificationAPI.sendFirstAlert(alarmId);
  };

  if (current?.delayTimes === 0) {
    alertFirstTime();
  }

  return (
    <AlarmContext initial={current}>
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <AlarmScreenMissionItem
            missionId={current?.mission.id}
            timer={current?.timer}
          />
          <AlarmScreenAction alarmId={alarmId} />
        </View>
      </View>
    </AlarmContext>
  );
};

export default AlarmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
