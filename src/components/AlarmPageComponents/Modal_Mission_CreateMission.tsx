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
import {theme} from '../../style/Theme';

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
                  <Text style={theme.typography.h1}>미션을 선택해주세요!</Text>
                </View>
                <Modal_Mission_CreateCareContent />
                <TouchableOpacity
                  style={theme.buttonContainerStyle}
                  onPress={onCloseModal}>
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
    paddingHorizontal: 16,
  },
  HeaderContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
