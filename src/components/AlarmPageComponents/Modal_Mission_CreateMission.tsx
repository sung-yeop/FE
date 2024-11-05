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
import Modal_Mission_CreateCareContent from './Modal_Mission_CreateCareContent';

type Props = {
  onCloseModal: () => void;
  isVisible: boolean;
};

const {height} = Dimensions.get('window');

const Modal_Mission_CreateMission = ({onCloseModal, isVisible}: Props) => {
  return (
    <Modal
      onRequestClose={onCloseModal}
      visible={isVisible}
      animationType="fade"
      transparent={true}>
      <SafeAreaProvider>
        <TouchableWithoutFeedback onPress={onCloseModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={e => e.stopPropagation}>
              <View style={styles.Container}>
                <View style={styles.HeaderContainer}>
                  <Text style={styles.HeaderText}>미션 추가하기</Text>
                </View>
                <Modal_Mission_CreateCareContent />
                <TouchableOpacity
                  style={styles.ButtonContainer}
                  onPress={onCloseModal}>
                  <Text style={styles.ButtonText}>저장하기</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaProvider>
    </Modal>
  );
};

export default Modal_Mission_CreateMission;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1000,
  },
  Container: {
    height: height * 0.8,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
  },
  HeaderContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 10,
  },
  HeaderText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  ButtonContainer: {
    backgroundColor: 'black',
    padding: 20,
    marginVertical: 15,
    borderRadius: 10,
  },
  ButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
