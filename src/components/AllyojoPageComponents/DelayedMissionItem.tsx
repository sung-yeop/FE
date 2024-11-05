import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Alarm} from '../../types';
import {GetCareMissionDataWithId} from '../../data/DefaultDataSet';
import {ViewCurrentSelectedRepeatDays} from '../AlarmPageComponents/Modal_CU_RepeatPicker';

type Props = {
  delayedAlarm: Alarm;
};

const DelayedMissionItem = ({delayedAlarm}: Props) => {
  const hour = delayedAlarm?.timer.getHours();
  const viewHour = hour >= 12 ? hour - 12 : hour;
  const minute = delayedAlarm?.timer.getMinutes();
  const ampm = hour >= 12 ? '오후' : '오전';
  const viewTime = `${String(viewHour).padStart(2, '0')}:${String(
    minute,
  ).padStart(2, '0')}`;
  const mission = GetCareMissionDataWithId(delayedAlarm.mission.id);

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={mission?.img} style={styles.missionImage} />
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.timeContainer}>
            <View style={styles.timeContent}>
              <Text style={styles.ampmText}>{ampm}</Text>
              <Text style={styles.timeText}>{viewTime}</Text>
            </View>
          </View>
          <Text style={styles.titleText}>{mission?.title}</Text>
          <Text style={styles.descriptionText}>{mission?.description}</Text>
        </View>
        <TouchableOpacity style={styles.missionProcessContainer}>
          <Text style={styles.missionProcessText}>{`미션\n진행`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DelayedMissionItem;

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
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  infoContainer: {
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  missionImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
    justifyContent: 'space-between',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  repeatText: {
    fontSize: 12,
    color: '#999',
  },
  timeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  missionProcessContainer: {
    backgroundColor: 'black',
    flex: 0.5,
    borderTopRightRadius: 10,
    borderBottomEndRadius: 10,
    justifyContent: 'center',
  },
  missionProcessText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
