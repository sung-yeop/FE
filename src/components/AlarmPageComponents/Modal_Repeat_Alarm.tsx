import {
  Dimensions,
  Modal,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  Button,
  Switch,
} from 'react-native';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import RepeatDatePicker from './RepeatDatePicker';

type Props = {
  isVisibleModal: boolean;
  onCloseModal: () => void;
};

const {height} = Dimensions.get('window');

const Modal_Repeat_Alarm = ({onCloseModal, isVisibleModal}: Props) => {
  return (
    <Modal
      visible={isVisibleModal}
      onRequestClose={onCloseModal}
      animationType="slide"
      transparent={true}>
      <SafeAreaProvider>
        <TouchableWithoutFeedback onPress={onCloseModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
              <View style={styles.modalContainer}>
                <View style={styles.modalTitleContainer}>
                  <Text style={styles.modalTitle}>반복 요일 선택</Text>
                </View>
                <View style={styles.modalContentContainer}>
                  <RepeatDatePicker onClose={onCloseModal} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaProvider>
    </Modal>
  );
};

export default Modal_Repeat_Alarm;

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
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  modalContentContainer: {
    alignContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
});
