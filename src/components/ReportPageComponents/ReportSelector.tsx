import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useReportManager} from '../../hooks/useReportManager';
import CustomCalendar from '../CustomCalendar';

const ReportSelector = () => {
  const {updateCurrentDuration} = useReportManager();
  const [isVisibleCalendar, setisVisibleCalendar] = useState<boolean>(false);
  return (
    <View style={styles.Container}>
      <View style={{marginBottom: 10}}>
        <Text style={styles.headerText}>다음으로 기간을 선택해주세요!</Text>
      </View>
      <View
        style={[
          styles.SelectContainer,
          isVisibleCalendar && {marginBottom: 10},
        ]}>
        <View style={styles.selectPeriodContainer}>
          <TouchableOpacity onPress={() => updateCurrentDuration('Today')}>
            <Text style={styles.text}>오늘</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateCurrentDuration('Week')}>
            <Text style={styles.text}>이번주</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateCurrentDuration('Month')}>
            <Text style={styles.text}>이번달</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.CalenderContainer}>
          <Text style={styles.text}>날짜 선택</Text>
          <TouchableOpacity
            onPress={() => setisVisibleCalendar(!isVisibleCalendar)}>
            <Text style={styles.text}>달력 사진</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isVisibleCalendar && <CustomCalendar isPeriod={true} />}
    </View>
  );
};

export default ReportSelector;

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  SelectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CalenderContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  selectPeriodContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  text: {
    color: 'black',
  },
  headerText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    color: 'black',
  },
});
