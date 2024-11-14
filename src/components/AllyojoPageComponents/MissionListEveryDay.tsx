import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {useHandleAlldAlarm} from '../../hooks/useHandleAllAlarm';
import MissionItemInTodoPage from './Modal_CU_Todo/MissionItemInTodoPage';

const MissionListEveryDay = () => {
  const {findAlarmRepeatAllDay} = useHandleAlldAlarm();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.subContainer}>
        {findAlarmRepeatAllDay &&
          findAlarmRepeatAllDay.map(alarm => (
            <MissionItemInTodoPage key={alarm.alarmid} alarm={alarm} />
          ))}
      </View>
    </ScrollView>
  );
};

export default MissionListEveryDay;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    overflow: 'hidden',
  },
  subContainer: {
    gap: 12,
  },
});
