import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TimePicker from '../TimePicker';
import Modal_CU_CreateMission from './Modal_CU_CreateMission';
import Modal_CU_Setting from './Modal_CU_Setting';
import Modal_CU_RepeatPicker from './Modal_CU_RepeatPicker';
import {useCurrentAlarm} from '../../hooks/useCurrentAlarm';

const Modal_CU_Content = () => {
  const {current, updateAlarm} = useCurrentAlarm();
  return (
    <View>
      <TimePicker current={current} updateAlarm={updateAlarm} />
      <Modal_CU_RepeatPicker />
      <Modal_CU_CreateMission />
      <Modal_CU_Setting />
    </View>
  );
};

export default Modal_CU_Content;

const styles = StyleSheet.create({});
