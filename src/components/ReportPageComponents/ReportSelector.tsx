import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useReportManager} from '../../hooks/useReportManager';
import CustomCalendar from '../CustomCalendar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DurationButton = ({label, onPress, isSelected}: any) => (
  <TouchableOpacity
    style={[
      stylesDuration.durationButton,
      isSelected && stylesDuration.selectedButton,
    ]}
    onPress={onPress}>
    <Text
      style={[
        stylesDuration.durationText,
        isSelected && stylesDuration.selectedText,
      ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const ReportSelector = () => {
  const {updateCurrentDuration} = useReportManager();
  const [isVisibleCalendar, setisVisibleCalendar] = useState<boolean>(false);
  const [isCalendarSelected, setIsCalendarSelected] = useState(false);
  const [activeBtn, setActiveBtn] = useState<number>(-1);
  const today = new Date();
  today.setHours(today.getHours() + 9);

  const handleDurationSelect = (duration: any) => {
    updateCurrentDuration(duration);
    setisVisibleCalendar(false);
    setIsCalendarSelected(false);
  };

  const toggleCalendar = () => {
    setisVisibleCalendar(!isVisibleCalendar);
    setIsCalendarSelected(!isCalendarSelected);
    setActiveBtn(-1);
  };

  return (
    <View style={styles.Container}>
      <Text style={styles.headerText}>기간 선택</Text>
      <View style={styles.selectPeriodContainer}>
        <DurationButton
          label="오늘"
          onPress={() => {
            setActiveBtn(0);
            handleDurationSelect({startDate: today, endDate: today});
          }}
          isSelected={activeBtn === 0}
        />
        <DurationButton
          label="이번주"
          onPress={() => {
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            setActiveBtn(1);
            handleDurationSelect({
              startDate: startOfWeek,
              endDate: today,
            });
          }}
          isSelected={activeBtn === 1}
        />
        <DurationButton
          label="이번달"
          onPress={() => {
            const startOfMonth = new Date(
              today.getFullYear(),
              today.getMonth(),
              1,
            );
            handleDurationSelect({
              startDate: startOfMonth,
              endDate: today,
            });
            setActiveBtn(2);
          }}
          isSelected={activeBtn === 2}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.calendarButton,
          isCalendarSelected && styles.selectedCalendarButton,
        ]}
        onPress={toggleCalendar}>
        <Icon
          name="calendar-month"
          size={20}
          color={isCalendarSelected ? '#fff' : '#666'}
        />
        <Text
          style={[
            styles.calendarText,
            isCalendarSelected && styles.selectedCalendarText,
          ]}>
          직접 선택하기
        </Text>
      </TouchableOpacity>
      {isVisibleCalendar && <CustomCalendar isPeriod={true} />}
    </View>
  );
};

export default ReportSelector;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    gap: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  headerText: {
    fontSize: 24,
    color: '#333',
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
  },
  selectPeriodContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
    justifyContent: 'center',
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  calendarText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    color: '#666',
  },
  selectedCalendarButton: {
    backgroundColor: '#2196F3',
  },
  selectedCalendarText: {
    color: '#fff',
  },
});

const stylesDuration = StyleSheet.create({
  durationButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: '#f8f9fa',
  },
  selectedButton: {
    backgroundColor: '#2196F3',
  },
  durationText: {
    fontSize: 15,
    color: '#666',
    fontFamily: 'Pretendard-Medium',
  },
  selectedText: {
    color: '#fff',
  },
});
