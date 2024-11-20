import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Alarm} from '../../../types';
import {ViewCurrentSelectedRepeatDays} from '../../AlarmPageComponents/Modal_CU_RepeatPicker';

const GAlarmItem = ({alarm}: {alarm: Alarm}) => {
  return (
    <View>
      <Text>{ViewCurrentSelectedRepeatDays(alarm.alarmDays)}</Text>
    </View>
  );
};

export default GAlarmItem;

const styles = StyleSheet.create({});
