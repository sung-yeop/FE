import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import CustomCalendar from '../../CustomCalendar';
import TimePicker from '../../TimePicker';
import {useCurrentTodo} from '../../../hooks/useCurrentTodo';
import Modal_CU_SaveButton from './Modal_CU_SaveButton';
import {useTodoManager} from '../../../hooks/useTodoManager';
import CustomTimePicker from '../../../module/CustomTimePicker';

type Props = {
  onCloseModal: () => void;
};

const Modal_CU_Todo_Content = ({onCloseModal}: Props) => {
  const {currentTodo, updateTodo} = useCurrentTodo();
  const {saveTodo} = useTodoManager();

  const saveCurrentTodo = () => {
    saveTodo(currentTodo);
  };

  return (
    <View style={styles.container}>
      <CustomCalendar isPeriod={false} />
      {/* <TimePicker current={currentTodo} updateTodo={updateTodo} /> */}
      <CustomTimePicker target={currentTodo} updateFun={updateTodo} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="제목을 입력해주세요"
          value={currentTodo.title || ''}
          onChangeText={text => updateTodo({title: text})}
        />
        <TextInput
          placeholder="추가 설명을 입력해주세요"
          value={currentTodo.description || ''}
          onChangeText={text => updateTodo({description: text})}
        />
      </View>
      <Modal_CU_SaveButton
        currentTodo={currentTodo}
        onSaveCurrentTodo={saveCurrentTodo}
        onCloseModal={onCloseModal}
      />
    </View>
  );
};

export default Modal_CU_Todo_Content;

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
  },
});
