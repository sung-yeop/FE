import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Todo} from '../../../types';

type Props = {
  currentTodo: Todo;
  onSaveCurrentTodo: () => void;
  onCloseModal: () => void;
};

const Modal_CU_SaveButton = ({
  currentTodo,
  onSaveCurrentTodo,
  onCloseModal,
}: Props) => {
  const onClickSaveButton = () => {
    if (!currentTodo.title) {
      Alert.alert('주의', '앞으로 어떤 할일인지 제목을 입력해주세요', [
        {
          text: '확인',
          style: 'cancel',
        },
      ]);
      return null;
    }
    onSaveCurrentTodo();
    onCloseModal();
  };
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={onClickSaveButton}>
      <Text style={styles.buttonText}>저장하기</Text>
    </TouchableOpacity>
  );
};

export default Modal_CU_SaveButton;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 16,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
