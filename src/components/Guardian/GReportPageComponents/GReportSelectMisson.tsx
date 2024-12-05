import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useGuardianReportManager} from '../../../hooks/useGuardianReportManager';
import {MissionCareType, Report} from '../../../types';
import {ReportAPI} from '../../../api/ReportAPI';
import AddMissionButton from '../../AddMissionButton';
import Modal_SelectMission from '../../ReportPageComponents/Modal_SelectMission';
import GModal_SelectMission from './GModal_SelectMission';

type Props = {
  current: Report & {
    username: string;
  };
};

const GReportSelectMisson = ({current}: Props) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const clickMissionSelectBtn = () => {
    setIsVisibleModal(true);
  };

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        {!current.mission ? (
          <>
            <View style={styles.textContainer}>
              <Text style={styles.mainTitle}>이전 미션을 분석해보세요</Text>
              <Text style={styles.subtitle}>
                어떤 미션을 분석하고 싶으신가요?
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <AddMissionButton onPressButton={clickMissionSelectBtn} />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.selectedTitle}>선택된 미션</Text>
            <AddMissionButton onPressButton={clickMissionSelectBtn} />
          </>
        )}
      </View>
      {/* <GModal_SelectMission
        onCloseModal={() => setIsVisibleModal(false)}
        isVisible={isVisibleModal}
      /> */}
    </View>
  );
};

export default GReportSelectMisson;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  content: {
    gap: 16,
  },
  textContainer: {
    alignItems: 'center',
    gap: 8,
  },
  mainTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  selectedTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 4,
  },
});
