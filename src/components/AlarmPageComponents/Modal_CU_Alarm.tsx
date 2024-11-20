import {Modal, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Alarm} from '../../types';
import Modal_CU_Header from './Modal_CU_Header';
import AlarmContext from './AlarmContext';
import SaveAlarmButton from './SaveAlarmButton';
import Modal_CU_Content from './Modal_CU_Content';
import SaveAlarmGuardianButton from '../Guardian/GAlarmPageComponents/Modal_Select_Senior/SaveAlarmGuardianButton';

type Props = {
  closeModal: () => void;
  isVisibleModal: boolean;
  alarm?: Alarm;
  children?: React.ReactNode;
};

// children은 Guardian이 user Select를 위한 컴포넌트이다.
// children이 있다면 guardian 페이지에서 알람을 생성했음을 의미한다.
const Modal_CU_Alarm = ({
  closeModal,
  isVisibleModal,
  alarm,
  children,
}: Props) => {
  return (
    <Modal
      visible={isVisibleModal}
      onRequestClose={closeModal}
      animationType="slide"
      transparent={false}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.modalContainer}>
          <AlarmContext initial={alarm || undefined}>
            <Modal_CU_Header closeModal={closeModal} alarm={alarm} />
            <ScrollView>
              {children}
              <Modal_CU_Content />
              {children !== undefined ? (
                <SaveAlarmGuardianButton
                  id={alarm?.alarmid}
                  closeModal={closeModal}
                />
              ) : (
                <SaveAlarmButton id={alarm?.alarmid} closeModal={closeModal} />
              )}
            </ScrollView>
          </AlarmContext>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

export default Modal_CU_Alarm;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
});
