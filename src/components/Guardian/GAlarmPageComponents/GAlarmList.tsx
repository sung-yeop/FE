import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useGuardianManager} from '../../../hooks/useGuardianManager';
import {SafeAreaView} from 'react-native-safe-area-context';
import AlarmItem from '../../AlarmPageComponents/AlarmItem';
import Modal_CU_Alarm from '../../AlarmPageComponents/Modal_CU_Alarm';
import {Alarm} from '../../../types';
import GAlarmSeniorSelect from './GAlarmSeniorSelect';

const GAlarmList = () => {
  const {allAlarms} = useGuardianManager();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectAlarm, setSelectAlarm] = useState<Alarm>();

  const onClickItem = (alarm: Alarm) => {
    setIsVisible(true);
    setSelectAlarm(alarm);
  };

  return (
    <SafeAreaView style={styles.container}>
      {allAlarms.map(alarm => (
        <AlarmItem
          key={alarm.alarmid}
          alarm={alarm}
          onPress={() => onClickItem(alarm)}
        />
      ))}
      <Modal_CU_Alarm
        closeModal={() => setIsVisible(false)}
        isVisibleModal={isVisible}
        alarm={selectAlarm}>
        <GAlarmSeniorSelect />
      </Modal_CU_Alarm>
    </SafeAreaView>
  );
};

export default GAlarmList;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});
