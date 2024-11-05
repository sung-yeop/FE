import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SelectList} from '../../types';
import Entypo from 'react-native-vector-icons/Entypo';

type Props = {
  selectList: SelectList;
  handleSelect: ({prop}: {prop: SelectList}) => void;
};

const AlarmListHeader = ({selectList, handleSelect}: Props) => {
  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={
          selectList === ('Alarm' as SelectList)
            ? styles.ActiveButtonContainer
            : styles.ButtonContainer
        }
        onPress={() => handleSelect({prop: 'Alarm'})}>
        <Text
          style={
            selectList === ('Alarm' as SelectList)
              ? styles.ActiveButtonText
              : styles.ButtonText
          }>
          알람
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectList === ('Mission' as SelectList)
            ? styles.ActiveButtonContainer
            : styles.ButtonContainer
        }
        onPress={() => handleSelect({prop: 'Mission'})}>
        <Text
          style={
            selectList === ('Mission' as SelectList)
              ? styles.ActiveButtonText
              : styles.ButtonText
          }>
          미션
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AlarmListHeader;

const styles = StyleSheet.create({
  Container: {
    marginVertical: 10,
    flexDirection: 'row',
    gap: 5,
  },
  ButtonContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  ButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  ActiveButtonContainer: {
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 10,
  },
  ActiveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
