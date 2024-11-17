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
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../../../style/Theme';
import Modal_Select_Senior_Content from './Modal_Select_Senior_Content';
import {useAlarmManager} from '../../../../hooks/useAlarmManager';
import {SeniorInfo} from '../../../../types';
import {useCurrentAlarm} from '../../../../hooks/useCurrentAlarm';

type Props = {
  isVisible: boolean;
  onCloseModal: () => void;
};

const {height} = Dimensions.get('window');

const Modal_Select_Senior = ({isVisible, onCloseModal}: Props) => {
  const {updateAlarm} = useCurrentAlarm();
  const [selectedUser, setSelectedUser] = useState<SeniorInfo | undefined>();

  const onClickSaveButton = () => {
    if (selectedUser) {
      updateAlarm({username: selectedUser});
    }
    onCloseModal();
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onCloseModal}
      animationType="slide"
      transparent={true}>
      <SafeAreaProvider>
        <TouchableWithoutFeedback onPress={onCloseModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
              <View style={styles.modalContainer}>
                <View>
                  <Text
                    style={[
                      theme.buttonTextStyle,
                      {color: 'black', fontSize: 24, paddingVertical: 20},
                    ]}>
                    보호자를 선택해주세요
                  </Text>
                </View>
                <Modal_Select_Senior_Content
                  setSelectedUser={setSelectedUser}
                />
                <TouchableOpacity
                  style={theme.buttonContainerStyle}
                  onPress={onClickSaveButton}>
                  <Text style={theme.buttonTextStyle}>저장하기</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaProvider>
    </Modal>
  );
};

export default Modal_Select_Senior;

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
});
