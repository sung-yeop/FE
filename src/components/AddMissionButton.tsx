import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useReportManager} from '../hooks/useReportManager';
import ReportMissionItem from './ReportPageComponents/ReportMissionItem';
import Modal_SelectMission from './ReportPageComponents/Modal_SelectMission';

type Props = {
  onPressButton: () => void;
};

// This Component is using in AlarmAddModal and ReportPage to Add Mission
const AddMissionButton = ({onPressButton}: Props) => {
  const {current} = useReportManager();
  return (
    <View>
      {current.mission ? (
        <ReportMissionItem
          missionId={current.mission}
          onPress={onPressButton}
        />
      ) : (
        <TouchableOpacity
          style={styles.AddMissionContainer}
          onPress={onPressButton}>
          <Entypo
            name="plus"
            style={styles.AddMissionText}
            size={24}
            color={'gray'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddMissionButton;

const styles = StyleSheet.create({
  AddMissionContainer: {
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'dashed',
    paddingVertical: 25,
  },
  AddMissionText: {
    textAlign: 'center',
  },
});
