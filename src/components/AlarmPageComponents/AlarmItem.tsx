import {
  Animated,
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {Alarm} from '../../types';
import {ViewCurrentSelectedRepeatDays} from './Modal_CU_RepeatPicker';
import {GetCareMissionDataWithId} from '../../data/DefaultDataSet';
import {useAlarmManager} from '../../hooks/useAlarmManager';
import {TimeFormatting} from '../../util/TimeFormatting';

type Props = {
  alarm: Alarm;
  onPress: () => void;
};

const AlarmItem = ({alarm, onPress}: Props) => {
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
            trackColor={{false: '#767577', true: '#e6e9ed'}}
            thumbColor={alarm.active ? '#2cc295' : '#f4f3f4'}
          />
        </View>
        <View style={styles.missionInfoContainer}>
          <Image source={mission.img} style={styles.missionImage} />
          <View style={styles.missionTextContainer}>
            <Text style={styles.missionTitle}>{mission.title}</Text>
            <Text style={styles.missionDescription}>{mission.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AlarmItem;

const styles = StyleSheet.create({
  alarmContainer: {
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 0.4,
    borderColor: 'gray',
  },
  mainContent: {
    padding: 20,
  },
  strictModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  repeatText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  strictModeText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  // 시간 표시
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  ampmText: {
    fontSize: 20,
    color: '#666',
    marginRight: 6,
    fontWeight: '500',
    lineHeight: 26,
  },
  timeText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: -2,
    includeFontPadding: true,
  },
  // 미션 정보
  missionInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  missionImage: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  missionTextContainer: {
    flex: 1,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  missionDescription: {
    fontSize: 14,
    color: '#666',
  },
  // 하단 스위치
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
});
