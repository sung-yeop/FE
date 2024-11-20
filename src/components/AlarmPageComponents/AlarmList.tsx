import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {allAlarmsSelector} from '../../atoms';
import {Alarm} from '../../types';
import Modal_CU_Alarm from './Modal_CU_Alarm';
import AlarmItem from './AlarmItem';

type Props = {
  isGuardian?: boolean;
};

const AlarmList = ({isGuardian}: Props) => {
  const alarms = useRecoilValue(allAlarmsSelector);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [selectAlarm, setSelectAlarm] = useState<Alarm>();

  const onClickItem = (alarm: Alarm) => {
    setIsVisibleModal(true);
    setSelectAlarm(alarm);
  };

  useEffect(() => {
    console.log('전체 알람 : ', alarms);
    alarms.forEach(alarm => {
      console.log('Alarm timer type:', typeof alarm.timer);
      console.log('Is Date instance:', alarm.timer instanceof Date);
      console.log('Alarm data:', alarm);
    });
  }, [alarms]);

  return (
    <View style={styles.AlarmListContainer}>
      {isGuardian
        ? alarms.map((alarm: Alarm) => {
            if (alarm.createdByGuardian) {
              return (
                <AlarmItem
                  key={alarm.alarmid}
                  onPress={() => onClickItem(alarm)}
                  alarm={alarm}
                />
              );
            }
            return null;
          })
        : alarms.map((alarm: Alarm) => {
            if (!alarm.createdByGuardian) {
              return (
                <AlarmItem
                  key={alarm.alarmid}
                  onPress={() => onClickItem(alarm)}
                  alarm={alarm}
                />
              );
            }
            return null;
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
