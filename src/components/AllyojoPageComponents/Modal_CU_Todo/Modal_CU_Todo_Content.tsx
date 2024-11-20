import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect} from 'react';
import CustomCalendar from '../../CustomCalendar';
import {useCurrentTodo} from '../../../hooks/useCurrentTodo';
import CustomTimePicker from '../../../module/CustomTimePicker';

const Modal_CU_Todo_Content = () => {
  const {currentTodo, updateTodo} = useCurrentTodo();

  useEffect(() => {
    console.log('Current Todo : ', currentTodo);
  }, [currentTodo]);

  return (
    <View style={styles.container}>
      <CustomCalendar isPeriod={false} />
      {/* <TimePicker current={currentTodo} updateTodo={updateTodo} /> */}
      <CustomTimePicker target={currentTodo} updateFun={updateTodo} />
      <View style={styles.inputContainer}>
        <TextInput
          style={{paddingVertical: 16, paddingHorizontal: 12}}
          placeholder="제목을 입력해주세요"
          value={currentTodo.title || ''}
          onChangeText={text => updateTodo({title: text})}
        />
        <TextInput
          style={{paddingVertical: 16, paddingHorizontal: 12}}
          placeholder="추가 설명을 입력해주세요"
          value={currentTodo.description || ''}
          onChangeText={text => updateTodo({description: text})}
        />
      </View>
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
