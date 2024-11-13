import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {useHandleAlldAlarm} from '../../hooks/useHandleAllAlarm';
import ListHeader from './ListHeader';
import TodoItem from './Modal_CU_Todo/MissionItemInTodoPage';
import MissionItemInTodoPage from './Modal_CU_Todo/MissionItemInTodoPage';

const MissionListEveryDay = () => {
  const {findAlarmRepeatAllDay} = useHandleAlldAlarm();

  return (
    <ScrollView style={styles.container}>
      <ListHeader powerTitle={'매일'} title="해야하는 미션이예요!" />
      {findAlarmRepeatAllDay &&
        findAlarmRepeatAllDay.map(alarm => (
          <MissionItemInTodoPage key={alarm.alarmid} alarm={alarm} />
        ))}
    </ScrollView>
  );
};

export default MissionListEveryDay;

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
