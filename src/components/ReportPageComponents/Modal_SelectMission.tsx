import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Modal_MissionContent from './Modal_MissionContent';
import {useReportManager} from '../../hooks/useReportManager';
import {MissionCareType} from '../../types';

type Props = {
  isVisible: boolean;
  onCloseModal: () => void;
};

const {height} = Dimensions.get('window');

const Modal_SelectMission = ({isVisible, onCloseModal}: Props) => {
  const {updateCurrentMission} = useReportManager();
  const [selectMission, setSelectMission] = useState<MissionCareType>();

  const onClickSaveButton = () => {
    updateCurrentMission(selectMission);
    onCloseModal();
  };
  return (
    <Modal
      onRequestClose={onCloseModal}
      visible={isVisible}
      animationType="fade"
      transparent={true}>
      <SafeAreaProvider>
        <TouchableWithoutFeedback onPress={onCloseModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
              <View style={styles.modalContainer}>
                <View style={styles.HeaderContainer}>
                  <Text style={styles.HeaderText}>미션 선택</Text>
                </View>
                <View>
                  <Modal_MissionContent setSelectMission={setSelectMission} />
                </View>
                <TouchableOpacity onPress={onClickSaveButton}>
                  <Text>저장하기</Text>
                </TouchableOpacity>
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
});
