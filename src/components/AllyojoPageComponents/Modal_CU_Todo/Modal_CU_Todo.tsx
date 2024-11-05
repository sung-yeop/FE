import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Modal_CU_Todo_Header from './TodoModalHeader';
import TodoModalHeader from './TodoModalHeader';
import CustomCalendar from '../../CustomCalendar';
import {Todo} from '../../../types';
import {TodoContext} from '../TodoContext';
import {useCurrentTodo} from '../../../hooks/useCurrentTodo';
import TimePicker from '../../TimePicker';
import Modal_CU_Todo_Content from './Modal_CU_Todo_Content';
import Modal_CU_SaveButton from './Modal_CU_SaveButton';
import {useTodoManager} from '../../../hooks/useTodoManager';

type Props = {
  isVisible: boolean;
  onCloseModal: () => void;
  todo?: Todo;
};

const Modal_CU_Todo = ({isVisible, onCloseModal, todo}: Props) => {
  return (
    <Modal
      visible={isVisible}
      onRequestClose={onCloseModal}
      animationType="slide"
      transparent={false}>
      <SafeAreaProvider>
        <TodoContext initialTodo={todo || undefined}>
          <View style={styles.modalContainer}>
            <TodoModalHeader onCloseModal={onCloseModal} />
            <Modal_CU_Todo_Content onCloseModal={onCloseModal} />
          </View>
        </TodoContext>
      </SafeAreaProvider>
    </Modal>
  );
};

// 뒤로가기 버튼
// 날짜 선택
// 시간 선택
// 타이틀
// 추가 설명

export default Modal_CU_Todo;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
  },
});
