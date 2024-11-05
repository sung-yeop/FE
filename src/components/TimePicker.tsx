import React, {useEffect, useState} from 'react';
import {View, Platform, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Alarm, Todo} from '../types';
import {TimeFormatting} from '../util/TimeFormatting';

type Props = {
  current: Alarm | Todo;
  updateAlarm?: (updates: Partial<Alarm>) => void;
  updateTodo?: (updates: Partial<Todo>) => void;
};

const TimePicker = ({current, updateAlarm, updateTodo}: Props) => {
  const [show, setShow] = useState(false);
  const {ampm, viewTime} = TimeFormatting(current.timer);

  console.log('current : ', current);
  const onChangeInternal = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || current.timer;
    setShow(Platform.OS === 'ios');
    updateAlarm
      ? updateAlarm({timer: currentDate})
      : updateTodo
      ? updateTodo({timer: currentDate})
      : console.log('updateAlarm, updateTodo 함수 모두 전달되지 않았습니다');
  };

  const showTimepicker = () => {
    setShow(true);
  };

  return (
    <View>
      {Platform.OS === 'ios' ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={current.timer}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={onChangeInternal}
        />
      ) : (
        <View>
          <View style={styles.timeContainer}>
            <Text style={styles.ampm}>{ampm}</Text>
            <Text style={styles.viewTime}>{viewTime}</Text>
          </View>
          <TouchableOpacity style={styles.AndroidSelectTimeButtonContainer}>
            <Text style={styles.AndroidSelectTimeText} onPress={showTimepicker}>
              시간 선택
            </Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={current.timer}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeInternal}
            />
          )}
        </View>
      )}
    </View>
  );
};
export default TimePicker;

const styles = StyleSheet.create({
  AndroidSelectTimeButtonContainer: {
    backgroundColor: '#007AFF', // iOS 블루 색상 사용
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  AndroidSelectTimeText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  timeContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ampm: {
    fontWeight: 'semibold',
    fontSize: 20,
    color: 'black',
  },
  viewTime: {
    fontWeight: 'bold',
    fontSize: 28,
    color: 'black',
  },
});
