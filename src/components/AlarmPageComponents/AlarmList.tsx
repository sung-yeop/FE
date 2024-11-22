import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {allAlarmsSelector} from '../../atoms';
import {Alarm} from '../../types';
import Modal_CU_Alarm from './Modal_CU_Alarm';
import AlarmItem from './AlarmItem';

type Props = {
  isGuardian: boolean;
};

const AlarmList = ({isGuardian}: Props) => {
  const alarms = useRecoilValue(allAlarmsSelector);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [selectAlarm, setSelectAlarm] = useState<Alarm>();

  const onClickItem = (alarm: Alarm) => {
    setIsVisibleModal(true);
    setSelectAlarm(alarm);
  };

  const filteredAlarms = alarms.filter((alarm: Alarm) =>
    isGuardian ? alarm.createdByGuardian : !alarm.createdByGuardian,
  );

  return (
    <View style={styles.AlarmListContainer}>
      {filteredAlarms.map((alarm: Alarm) => {
        return (
          <AlarmItem
            key={alarm.alarmid}
            onPress={() => onClickItem(alarm)}
            alarm={alarm}
          />
        );
      })}
      <Modal_CU_Alarm
        isVisibleModal={isVisibleModal}
        closeModal={() => setIsVisibleModal(false)}
        alarm={selectAlarm}
      />
    </View>
  );
};

export default AlarmList;

const styles = StyleSheet.create({
  AlarmListContainer: {
    gap: 12,
  },
});
