import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GetCareMissionDataWithId} from '../../data/DefaultDataSet';
import {MissionCareType} from '../../types';

type Props = {
  missionId: MissionCareType;
};

const AlarmScreenMissionItem = ({missionId}: Props) => {
  const mission = GetCareMissionDataWithId(missionId);
  if (!mission) return;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>미션 알람</Text>
      <View style={styles.missionContainer}>
        <Image source={mission.img} style={styles.missionImg} />
        <Text style={styles.missionTitle}>{mission.title}</Text>
      </View>
    </View>
  );
};

export default AlarmScreenMissionItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  missionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  missionImg: {
    height: 24,
    width: 24,
  },
  missionTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  titleText: {
    textAlign: 'center',
    padding: 20,
    fontWeight: 'bold',
    fontSize: 32,
    color: 'black',
  },
});
