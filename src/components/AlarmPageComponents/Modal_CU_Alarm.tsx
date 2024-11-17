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
  // 11월 16일 TODO : -> children이 전달될경우 Guardian의 알람 생성임
  // 그렇다면 알람 저장은 어떻게 할것인지를 처리해야함
  // Guardian에서 알람 생성 -> 본인 휴대폰에서 알람이 울리는 것이 아니라, 시니어에게 알람을 생성해주는 것
  // SaveAlarmButton에서 useAlarmManager가 아닌, 다른 형식으로 알람을 처리해야함 (특정 사용자에게 알람을 생성하도록 전달하는등)
  // 즉, 내일은 SaveAlarmGuardianButton을 정의해야함
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
              {children && (
                <SaveAlarmGuardianButton
                  id={alarm?.alarmid}
                  closeModal={closeModal}
                />
              )}
              {!children && (
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
