import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Modal_Repeat_Alarm from './Modal_Repeat_Alarm.tsx';
import {useCurrentAlarm} from '../../hooks/useCurrentAlarm.ts';
import Entypo from 'react-native-vector-icons/Entypo';

interface LabelItem {
  [key: number]: string;
}

export function ViewCurrentSelectedRepeatDays(repeat: number) {
  const label: LabelItem[] = [
    {0: '반복 없음'},
    {1: '월'},
    {2: '화'},
    {4: '수'},
    {8: '목'},
    {16: '금'},
    {32: '토'},
    {64: '일'},
  ];

  const ChangeForm =
    repeat === 127
      ? '매일'
      : repeat === 31
      ? '평일'
      : repeat === 96
      ? '주말'
      : label
          .map(item => {
            const itemKey = Object.keys(item)[0];
            return repeat & parseInt(itemKey) ? item[parseInt(itemKey)] : '';
          })
          .filter(v => v)
          .join(', ');

  return ChangeForm.length === 0 ? '반복 없음' : ChangeForm;
}

const Modal_CU_RepeatPicker = () => {
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const {current} = useCurrentAlarm();

  return (
    <View style={styles.repeatContainer}>
      <Text style={styles.title}>반복 설정</Text>
      <TouchableOpacity
        onPress={() => {
          setIsVisibleModal(true);
        }}>
        <View style={styles.repeatTextContainer}>
          <Text style={styles.repeatText}>
            {ViewCurrentSelectedRepeatDays(current.alarmDays)}
            <Entypo name="chevron-small-right" size={16} />
          </Text>
        </View>
      </TouchableOpacity>
      <Modal_Repeat_Alarm
        onCloseModal={() => {
          setIsVisibleModal(false);
        }}
        isVisibleModal={isVisibleModal}
      />
    </View>
  );
};

export default Modal_CU_RepeatPicker;

const styles = StyleSheet.create({
  repeatContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  repeatTextContainer: {
    flexDirection: 'row',
    alignItems: 'center', // 수직 중앙 정렬
    justifyContent: 'center',
  },
  repeatText: {
    color: 'black',
    fontWeight: 'semibold',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
