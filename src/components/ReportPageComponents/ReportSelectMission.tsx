import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AddMissionButton from '../AddMissionButton';
import Modal_SelectMission from './Modal_SelectMission';
import {MissionCareType} from '../../types';
import {getMissionFromReport} from '../../api/ReportAPI';
import {useReportManager} from '../../hooks/useReportManager';

const ReportSelectMission = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [missions, setMissions] = useState<MissionCareType[]>([]);
  const {current} = useReportManager();

  const getMissionsUsingAPI = async () => {
    const response = await getMissionFromReport();
    if (response) {
      for (const {missionId} of response) {
        setMissions(prev => [...prev, missionId]);
      }
    }
  };

  const clickMissionSelectBtn = () => {
    getMissionsUsingAPI();
    setIsVisibleModal(true);
  };

  return (
    <View style={styles.container}>
      {!current.mission ? (
        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            이전에 진행한 미션을 확인하고 싶나요?
          </Text>
          <Text style={styles.title}>우선 미션을 선택해주세요</Text>
        </View>
      ) : (
        <Text style={[styles.title, {textAlign: 'left'}]}>선택된 미션</Text>
      )}
      <AddMissionButton onPressButton={clickMissionSelectBtn} />
      <Modal_SelectMission
        isVisible={isVisibleModal}
        onCloseModal={() => {
          setIsVisibleModal(false);
          setMissions([]);
        }}
        missions={missions.length !== 0 ? missions : undefined}
      />
    </View>
  );
};

export default ReportSelectMission;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
  headerContainer: {
    gap: 6,
    paddingVertical: 12,
  },
});
