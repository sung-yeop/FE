import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useCurrentAlarm} from '../../hooks/useCurrentAlarm.ts';
import CheckBox from '@react-native-community/checkbox';

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
        <View style={styles.ButtonInviContainer}>
          <Text
            style={styles.ButtonInviText}
            onPress={() => toggleSpecialButton(31)}>
            평일
          </Text>
        </View>
        <View style={styles.ButtonInviContainer}>
          <Text
            style={styles.ButtonInviText}
            onPress={() => toggleSpecialButton(96)}>
            주말
          </Text>
        </View>
        <View style={styles.ButtonInviContainer}>
          <Text
            style={styles.ButtonInviText}
            onPress={() => toggleSpecialButton(127)}>
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
      <View style={styles.SaveButtonContainer}>
        <Text style={styles.SaveButtonText} onPress={onClickSaveButton}>
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
    gap: 5,
    paddingVertical: 10,
  },
  ButtonInviContainer: {
    backgroundColor: 'black',
    borderRadius: 5,
    marginVertical: 10,
  },
  ButtonInviText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  SaveButtonContainer: {
    backgroundColor: 'black',
    borderRadius: 10,
    marginVertical: 10,
  },
  SaveButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 15,
  },
});
