import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useHandleAlldAlarm} from '../../hooks/useHandleAllAlarm';
import {useListHeaderAnimation} from '../../hooks/useListHeaderAnimation';
import ListHeader from './ListHeader';
import TodoItem from './Modal_CU_Todo/TodoItem';

const TodoListEveryDay = () => {
  const {findAlarmRepeatAllDay} = useHandleAlldAlarm();
  const {isExpanded, toggleExpand, maxHeight} = useListHeaderAnimation();

  return (
    <ScrollView style={styles.container}>
      <ListHeader
        title={'매일'}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}>
        <Animated.View style={[styles.contentContainer, {maxHeight}]}>
          {findAlarmRepeatAllDay &&
            findAlarmRepeatAllDay.map(alarm => (
              <TodoItem key={alarm.alarmid} alarm={alarm} />
            ))}
        </Animated.View>
      </ListHeader>
    </ScrollView>
  );
};

export default TodoListEveryDay;

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
