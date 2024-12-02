import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useHandleAlldAlarm} from '../../hooks/useHandleAllAlarm';
import MissionItemInTodoPage from './Modal_CU_Todo/MissionItemInTodoPage';

const MissionList = () => {
  const {findAlarmRepeatDay} = useHandleAlldAlarm();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.subContainer}>
        {findAlarmRepeatDay &&
          findAlarmRepeatDay.map(alarm => (
            <MissionItemInTodoPage key={alarm.alarmid} alarm={alarm} />
          ))}
      </View>
    </ScrollView>
  );
};

export default MissionList;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  subContainer: {
    gap: 12,
  },
  headerContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  contentContainer: {
    overflow: 'hidden',
  },
});
