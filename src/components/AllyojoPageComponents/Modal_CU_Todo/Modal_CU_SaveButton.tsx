import {Alert, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {theme} from '../../../style/Theme';
import {useCurrentTodo} from '../../../hooks/useCurrentTodo';
import {useTodoManager} from '../../../hooks/useTodoManager';

type Props = {
  id?: string;
  onCloseModal: () => void;
};

const Modal_CU_SaveButton = ({id, onCloseModal}: Props) => {
  const {currentTodo, setCurrentTodo} = useCurrentTodo();
  const todoManager = useTodoManager();
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
    if (id) {
      todoManager.updateTodo(currentTodo);
    } else {
      todoManager.saveTodo(currentTodo);
      setCurrentTodo(currentTodo);
    }

    onCloseModal();
  };
  return (
    <TouchableOpacity
      style={theme.buttonContainerStyle}
      onPress={onClickSaveButton}>
      <Text style={theme.buttonTextStyle}>저장하기</Text>
    </TouchableOpacity>
  );
};

export default Modal_CU_SaveButton;
