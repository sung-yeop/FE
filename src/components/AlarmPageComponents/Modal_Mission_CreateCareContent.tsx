import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MissionItem from './MissionItem';
import {CareMissionData} from '../../data/DefaultDataSet';
import {useCurrentAlarm} from '../../hooks/useCurrentAlarm';

const Modal_Mission_CreateCareContent = () => {
  const {current} = useCurrentAlarm();
  return (
    <View style={styles.MissionContainer}>
      {CareMissionData.map(mission => (
        <MissionItem
          key={mission.id}
          id={mission.id}
          select={current.mission.id === mission.id}
        />
      ))}
    </View>
  );
};

export default Modal_Mission_CreateCareContent;

const styles = StyleSheet.create({
  MissionContainer: {
    gap: 5,
  },
});
