import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Alarm} from '../../../types';
import {GetCareMissionDataWithId} from '../../../data/DefaultDataSet';
import {ViewCurrentSelectedRepeatDays} from '../../AlarmPageComponents/Modal_CU_RepeatPicker';
import {theme} from '../../../style/Theme';

type Props = {
  alarm: Alarm;
};

const MissionItemInTodoPage = ({alarm}: Props) => {
  const hour = alarm?.timer.getHours();
  const viewHour = hour >= 12 ? hour - 12 : hour;
  const minute = alarm?.timer.getMinutes();
  const ampm = hour >= 12 ? '오후' : '오전';
  const viewTime = `${String(viewHour).padStart(2, '0')}:${String(
    minute,
  ).padStart(2, '0')}`;
  const mission = GetCareMissionDataWithId(alarm.mission.id);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.timeOutContaier}>
          <View style={styles.timeContainer}>
            <Text style={styles.ampmText}>{ampm}</Text>
            <Text style={styles.timeText}>{viewTime}</Text>
          </View>
        </View>
        <View>
          {ViewCurrentSelectedRepeatDays(alarm.alarmDays) !== '매일' && (
            <Text style={styles.repeatDaysText}>
              {ViewCurrentSelectedRepeatDays(alarm.alarmDays)}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.missionContainer}>
        <Image
          source={mission?.img}
          resizeMode="contain"
          style={styles.missionImg}
        />
        <View>
          <Text style={styles.missionText}>{mission?.title}</Text>
          <Text style={styles.missionDescipt}>{mission?.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default MissionItemInTodoPage;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  timeOutContaier: {
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 4,
    backgroundColor: '#929292',
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'baseline',
  },
  ampmText: {
    fontFamily: 'Pretendard-Bold',
    color: 'white',
    fontSize: 18,
  },
  timeText: {
    letterSpacing: -1,
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
    color: 'white',
  },
  missionContainer: {
    paddingTop: 12,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  missionText: {
    letterSpacing: -1,
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    color: 'black',
  },
  missionImg: {
    width: 40,
    height: 40,
  },
  missionDescipt: {
    fontFamily: 'Pretendard-Regular',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  repeatDaysText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: theme.colors.primary.main,
  },
});
