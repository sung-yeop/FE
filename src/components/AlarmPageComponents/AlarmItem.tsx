import {
  Animated,
  Image,
  LayoutAnimation,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Alarm} from '../../types';
import {ViewCurrentSelectedRepeatDays} from './Modal_CU_RepeatPicker';
import {useHandleAlldAlarm} from '../../hooks/useHandleAllAlarm';
import {GetCareMissionDataWithId} from '../../data/DefaultDataSet';
import {useAlarmManager} from '../../hooks/useAlarmManager';
import {TimeFormatting} from '../../util/TimeFormatting';

type Props = {
  alarm: Alarm;
  onPress: () => void;
};

const AlarmItem = ({alarm, onPress}: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const alarmManager = useAlarmManager();
  const {ampm, viewTime} = TimeFormatting(alarm.timer);
  const mission = GetCareMissionDataWithId(alarm.mission.id);

  if (!mission) {
    return null;
  }
  return (
    <View style={styles.alarmContainer}>
      <TouchableOpacity onPress={onPress} style={styles.mainContent}>
        <View style={styles.strictModeContainer}>
          <Text style={styles.repeatText}>
            {ViewCurrentSelectedRepeatDays(alarm.alarmDays)}
          </Text>
          <Text style={styles.strictModeText}>
            엄격모드: {alarm.mission.mode === 'Strict' ? 'ON' : 'OFF'}
          </Text>
        </View>
        <View style={styles.missionInfoContainer}>
          <Image source={mission.img} style={styles.missionImage} />
          <View style={styles.missionTextContainer}>
            <Text style={styles.missionTitle}>{mission.title}</Text>
            <Text style={styles.missionDescription}>{mission.description}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.timeContainer}>
            <Text style={styles.ampmText}>{ampm}</Text>
            <Text style={styles.timeText}>{viewTime}</Text>
          </View>
          <Switch
            value={alarm.active}
            onChange={() => {
              alarmManager.updateAlarm({
                alarm: {...alarm, active: !alarm.active},
              });
            }}
            trackColor={{false: '#767577', true: '#ced4da'}}
            thumbColor={alarm.active ? '#4bd964' : '#f4f3f4'}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AlarmItem;

const styles = StyleSheet.create({
  alarmContainer: {
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  repeatText: {
    fontSize: 14,
    color: '#666',
  },
  mainContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 15,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  ampmText: {
    fontSize: 18,
    color: '#666',
    marginRight: 5,
  },
  timeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  expandedContent: {
    overflow: 'hidden',
    padding: 15,
  },
  missionInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 8,
  },
  missionImage: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  missionTextContainer: {},
  missionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  missionDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  strictModeContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  strictModeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  foldButton: {
    backgroundColor: '#668ADF',
    padding: 10,
    alignItems: 'center',
  },
  foldButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
