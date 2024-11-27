import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useReportManager} from '../../hooks/useReportManager';
import {MissionCareType} from '../../types';
import MissionItem from '../AlarmPageComponents/MissionItem';
import ReportMissionItem from './ReportMissionItem';
import {theme} from '../../style/Theme';

type Props = {
  isVisible: boolean;
  onCloseModal: () => void;
  missions: MissionCareType[] | undefined;
};

const {height} = Dimensions.get('window');

const Modal_SelectMission = ({isVisible, onCloseModal, missions}: Props) => {
  const {updateCurrentMission} = useReportManager();
  const [selectMission, setSelectMission] = useState<MissionCareType>();

  const onClickSaveButton = () => {
    updateCurrentMission(selectMission);
    onCloseModal();
  };

  const isThereMissions =
    missions?.length === 0 || missions === undefined ? false : true;

  console.log('IsThereMissons : ', missions);

  return (
    <Modal
      onRequestClose={onCloseModal}
      visible={isVisible}
      animationType="slide"
      transparent={true}>
      <SafeAreaProvider>
        <TouchableWithoutFeedback onPress={onCloseModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
              <View style={styles.modalContainer}>
                {!isThereMissions && (
                  <Text style={styles.HeaderText}>
                    아직 완료된 미션이 없어요!
                  </Text>
                )}
                {isThereMissions && (
                  <View>
                    <View style={styles.HeaderContainer}>
                      <Text style={styles.HeaderText}>
                        완료한 미션을 선택해주세요!
                      </Text>
                    </View>
                    <View style={styles.contentContainer}>
                      {missions &&
                        missions.map(mission => (
                          <ReportMissionItem
                            key={mission}
                            missionId={mission}
                            onPress={() => setSelectMission(mission)}
                            isSelected={selectMission === mission}
                          />
                        ))}
                    </View>
                  </View>
                )}
                {!isThereMissions && (
                  <TouchableOpacity
                    style={theme.buttonContainerStyle}
                    onPress={onCloseModal}>
                    <Text style={theme.buttonTextStyle}>돌아가기</Text>
                  </TouchableOpacity>
                )}
                {isThereMissions && (
                  <TouchableOpacity
                    style={theme.buttonContainerStyle}
                    onPress={onClickSaveButton}>
                    <Text style={theme.buttonTextStyle}>저장하기</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaProvider>
    </Modal>
  );
};

export default Modal_SelectMission;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.8,
    padding: 20,
    borderWidth: 1,
    borderColor: 'gray',
    gap: 24,
  },
  HeaderContainer: {
    padding: 15,
  },
  HeaderText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 24,
  },
  contentContainer: {
    gap: 12,
  },
});
