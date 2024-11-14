import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {useHandleAlldAlarm} from '../../hooks/useHandleAllAlarm';
import DelayedMissionItem from './DelayedMissionItem';

const DelayedMissionList = () => {
  const {findAlarmDelayFromAll} = useHandleAlldAlarm();

  return (
    <ScrollView style={styles.container}>
      <View>
        {findAlarmDelayFromAll.map(alarm => (
          <DelayedMissionItem key={alarm.alarmid} delayedAlarm={alarm} />
        ))}
      </View>
    </ScrollView>
  );
};

export default DelayedMissionList;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
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
  content: {
    gap: 10,
  },
});
