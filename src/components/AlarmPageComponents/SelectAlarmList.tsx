import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

type Props = {
  onClick: () => void;
  isGuardianCheck: boolean;
};

const SelectAlarmList = ({onClick, isGuardianCheck}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          !isGuardianCheck
            ? [styles.button, {backgroundColor: 'black'}]
            : styles.button
        }
        onPress={onClick}>
        <Text
          style={
            !isGuardianCheck
              ? [
                  styles.buttonText,
                  {color: 'white', fontFamily: 'Pretendard-Bold'},
                ]
              : styles.buttonText
          }>
          내 알람
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          isGuardianCheck
            ? [styles.button, {backgroundColor: 'black'}]
            : styles.button
        }
        onPress={onClick}>
        <Text
          style={
            isGuardianCheck
              ? [
                  styles.buttonText,
                  {color: 'white', fontFamily: 'Pretendard-Bold'},
                ]
              : styles.buttonText
          }>
          보호자 알람
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectAlarmList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    paddingTop: 12,
    marginVertical: 12,
  },
  button: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  buttonText: {
    fontFamily: 'Pretendard-Regular',
    color: 'black',
  },
});
