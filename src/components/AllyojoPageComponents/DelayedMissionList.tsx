import {Animated, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {useHandleAlldAlarm} from '../../hooks/useHandleAllAlarm';
import DelayedMissionItem from './DelayedMissionItem';
import ListHeader from './ListHeader';
import {useListHeaderAnimation} from '../../hooks/useListHeaderAnimation';

const DelayedMissionList = () => {
  const {findAlarmDelayFromAll} = useHandleAlldAlarm();
  const {isExpanded, toggleExpand, maxHeight} = useListHeaderAnimation();

  return (
    <ScrollView style={styles.container}>
      <ListHeader
        title={'미션을 선택해주세요'}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}>
        <Animated.View style={[styles.contentContainer, {maxHeight}]}>
          {findAlarmDelayFromAll &&
            findAlarmDelayFromAll.map(alarm => (
              <DelayedMissionItem key={alarm.alarmid} delayedAlarm={alarm} />
            ))}
        </Animated.View>
      </ListHeader>
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
    overflow: 'hidden',
  },
});
