import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {allTodoSelector} from '../../atoms';
import TodoItem from './TodoItem';
import {Todo} from '../../types';
import Modal_CU_Todo from './Modal_CU_Todo/Modal_CU_Todo';

const TodoList = () => {
  const todos = useRecoilValue(allTodoSelector);
  const [selectTodo, setSelectTodo] = useState<Todo>();
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);

  const onClickTodo = (selectTodo: Todo) => {
    setIsVisibleModal(true);
    setSelectTodo(selectTodo);
  };

  return (
    <View style={styles.container}>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onClickTodo={onClickTodo} />
      ))}
      <Modal_CU_Todo
        isVisible={isVisibleModal}
        onCloseModal={() => setIsVisibleModal(false)}
        todo={selectTodo}
      />
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});
