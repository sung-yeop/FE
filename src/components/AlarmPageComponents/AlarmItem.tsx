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
  const [expanded, setExpanded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const alarmManager = useAlarmManager();
  const {ampm, viewTime} = TimeFormatting(alarm.timer);
  const mission = GetCareMissionDataWithId(alarm.mission.id);

  if (!mission) {
    return null;
  }

  useEffect(() => {
    if (expanded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [expanded, fadeAnim]);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };
  return (
    <View style={styles.alarmContainer}>
      <TouchableOpacity onPress={onPress} style={styles.mainContent}>
        <View>
          <Text style={styles.repeatText}>
            {ViewCurrentSelectedRepeatDays(alarm.alarmDays)}
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
            trackColor={{false: '#767577', true: '#ced4da'}}
            thumbColor={alarm.active ? '#4bd964' : '#f4f3f4'}
          />
        </View>
      </TouchableOpacity>
      {expanded && (
        <Animated.View style={[styles.expandedContent, {opacity: fadeAnim}]}>
          <View style={styles.strictModeContainer}>
            <Text style={styles.strictModeText}>
              엄격모드: {alarm.mission.mode === 'Strict' ? 'ON' : 'OFF'}
            </Text>
          </View>
          <View style={styles.missionInfoContainer}>
            <Image source={mission.img} style={styles.missionImage} />
            <View style={styles.missionTextContainer}>
              <Text style={styles.missionTitle}>{mission.title}</Text>
              <Text style={styles.missionDescription}>
                {mission.description}
              </Text>
            </View>
          </View>
        </Animated.View>
      )}
      <TouchableOpacity style={styles.foldButton} onPress={toggleExpand}>
        <Text style={styles.foldButtonText}>
          {expanded ? '접기' : '펼치기'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AlarmItem;

const styles = StyleSheet.create({
  alarmContainer: {
    marginVertical: 10,
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
  },
  missionImage: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  missionTextContainer: {
    flex: 1,
  },
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
    alignItems: 'flex-end',
    marginBottom: 10,
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
