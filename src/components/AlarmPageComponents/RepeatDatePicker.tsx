import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useCurrentAlarm} from '../../hooks/useCurrentAlarm.ts';
import CheckBox from '@react-native-community/checkbox';
import {theme} from '../../style/Theme.ts';

const days = [
  [0, '반복 없음'],
  [1, '월'],
  [2, '화'],
  [4, '수'],
  [8, '목'],
  [16, '금'],
  [32, '토'],
  [64, '일'],
];

const RepeatDatePicker = ({onClose}: {onClose: () => void}) => {
  const [selectedDays, setSelectedDays] = useState<number>(0);
  const {updateAlarm} = useCurrentAlarm();
  const [toggleButton, setToggleButton] = useState<
    'WeekDays' | 'EveryDay' | 'HoliyDay'
  >();

  const toggleCheckBox = (key: number) => {
    setSelectedDays(prev => {
      if (key === 0) {
        return 0;
      }
      return (prev & key) === 1 ? prev & ~key : prev | key;
    });
  };

  const toggleSpecialButton = (key: number) => {
    setSelectedDays(prev => {
      return prev === key ? 0 : key;
    });
  };

  const onClickSaveButton = () => {
    updateAlarm({alarmDays: selectedDays});
    onClose();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <View
          style={
            toggleButton === 'WeekDays'
              ? styles.activeContainer
              : styles.ButtonInviContainer
          }>
          <Text
            style={
              toggleButton === 'WeekDays'
                ? styles.activeButtonText
                : styles.ButtonInviText
            }
            onPress={() => {
              toggleSpecialButton(31);
              setToggleButton('WeekDays');
            }}>
            평일
          </Text>
        </View>
        <View
          style={
            toggleButton === 'HoliyDay'
              ? styles.activeContainer
              : styles.ButtonInviContainer
          }>
          <Text
            style={
              toggleButton === 'HoliyDay'
                ? styles.activeButtonText
                : styles.ButtonInviText
            }
            onPress={() => {
              toggleSpecialButton(96);
              setToggleButton('HoliyDay');
            }}>
            주말
          </Text>
        </View>
        <View
          style={
            toggleButton === 'EveryDay'
              ? styles.activeContainer
              : styles.ButtonInviContainer
          }>
          <Text
            style={
              toggleButton === 'EveryDay'
                ? styles.activeButtonText
                : styles.ButtonInviText
            }
            onPress={() => {
              toggleSpecialButton(127);
              setToggleButton('EveryDay');
            }}>
            매일
          </Text>
        </View>
      </View>
      {days.map(([key, label]) => (
        <View key={key} style={styles.checkboxContainer}>
          <CheckBox
            disabled={false}
            value={Boolean(
              selectedDays & (key as number) ||
                (key === 0 && selectedDays === 0),
            )}
            onValueChange={() => toggleCheckBox(key as number)}
            animationDuration={0.1}
            boxType={'circle'}
          />
          <Text style={styles.label}>{label}</Text>
        </View>
      ))}
      <View style={theme.buttonContainerStyle}>
        <Text style={theme.buttonTextStyle} onPress={onClickSaveButton}>
          추가하기
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RepeatDatePicker;

const styles = StyleSheet.create({
  container: {
    gap: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 10,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'semibold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  ButtonInviContainer: {
    borderRadius: 12,
    marginVertical: 12,
    borderWidth: 0.5,
  },
  activeContainer: {
    backgroundColor: theme.colors.primary.main,
    borderRadius: 12,
    marginVertical: 12,
  },
  activeButtonText: {
    fontSize: 14,
    fontFamily: theme.typography.body1.fontFamily,
    color: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ButtonInviText: {
    fontSize: 14,
    fontFamily: theme.typography.body1.fontFamily,
    color: 'black',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
