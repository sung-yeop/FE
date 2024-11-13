import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Alarm} from '../../../types';
import {GetCareMissionDataWithId} from '../../../data/DefaultDataSet';
import {ViewCurrentSelectedRepeatDays} from '../../AlarmPageComponents/Modal_CU_RepeatPicker';

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
      <View style={styles.leftContainer}>
        <Image source={mission?.img} style={styles.missionImage} />
      </View>
      <View style={styles.rightContainer}>
        {ViewCurrentSelectedRepeatDays(alarm.alarmDays) === '매일' ? (
          <View style={styles.todoContainer}>
            <View style={styles.timeContainer}>
              <Text style={styles.ampmText}>{ampm}</Text>
              <Text style={styles.timeText}>{viewTime}</Text>
            </View>
            <Text style={styles.titleText}>{mission?.title}</Text>
          </View>
        ) : (
          <View style={styles.weekContainer}>
            <View>
              <View style={styles.timeContainer}>
                <Text style={styles.ampmText}>{ampm}</Text>
                <Text style={styles.timeText}>{viewTime}</Text>
              </View>
              <Text style={styles.titleText}>{mission?.title}</Text>
            </View>
            <Text style={styles.repeatText}>
              {`매주 ${ViewCurrentSelectedRepeatDays(alarm.alarmDays)}`}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default MissionItemInTodoPage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leftContainer: {
    justifyContent: 'center',
    padding: 16,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    gap: 4,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  missionImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ampmText: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlignVertical: 'center',
  },
  todoContainer: {
    flexDirection: 'column',
    gap: 2,
  },
  weekContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginRight: 20,
  },
  repeatText: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
