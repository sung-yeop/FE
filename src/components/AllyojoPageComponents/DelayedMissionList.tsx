import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {useHandleAlldAlarm} from '../../hooks/useHandleAllAlarm';
import DelayedMissionItem from './DelayedMissionItem';
import ListHeader from './ListHeader';

const DelayedMissionList = () => {
  const {findAlarmDelayFromAll} = useHandleAlldAlarm();

  return (
    <ScrollView style={styles.container}>
      <ListHeader
        title={
          findAlarmDelayFromAll.length !== 0
            ? '아래 미션을 완료해주세요!'
            : '오늘은 미룬 알람이 없어요!'
        }></ListHeader>
      <ScrollView
        horizontal={true}
        style={styles.content}
        contentContainerStyle={styles.contentContainer}>
        {findAlarmDelayFromAll.map(alarm => (
          <DelayedMissionItem key={alarm.alarmid} delayedAlarm={alarm} />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default DelayedMissionList;

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
    gap: 10,
    flexDirection: 'row',
  },
  content: {
    gap: 10,
  },
});
