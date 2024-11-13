import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useHandleAlldAlarm} from '../../hooks/useHandleAllAlarm';
import ListHeader from './ListHeader';
import TodoItem from './Modal_CU_Todo/TodoItem';

const MissionList = () => {
  const {findAlarmRepeatDay} = useHandleAlldAlarm();

  return (
    <ScrollView style={styles.container}>
      <ListHeader powerTitle={'매주'} title={'설정된 미션이예요!'} />
      {findAlarmRepeatDay &&
        findAlarmRepeatDay.map(alarm => (
          <TodoItem key={alarm.alarmid} alarm={alarm} />
        ))}
    </ScrollView>
  );
};

export default MissionList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    overflow: 'hidden',
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
