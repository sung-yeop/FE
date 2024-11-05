import {useRecoilState} from 'recoil';
import {Todo} from '../types';
import {allTodoSelector, allTodoState, STORAGE_TODO_KEY} from '../atoms';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useTodoManager = () => {
  const [allTodo, setAllTodo] = useRecoilState(allTodoSelector);

  const loadTodos = async () => {
    try {
      AsyncStorage.clear();
      const savedAlarms = await AsyncStorage.getItem(STORAGE_TODO_KEY);
      if (savedAlarms) {
        setAllTodo(JSON.parse(savedAlarms) as Todo[]);
      } else {
        setAllTodo([]);
      }
    } catch (err) {
      console.log('LOAD ALARMS ERROR: ', err);
    }
  };

  const saveTodo = async (todo: Todo) => {
    try {
      const updatedTodos = [...allTodo, todo];
      await AsyncStorage.setItem(
        STORAGE_TODO_KEY,
        JSON.stringify(updatedTodos),
      );
      setAllTodo(updatedTodos);

      //TODO : 백엔드 저장 로직 필요

      console.log('Alarm saved successfully:', updatedTodos);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTodo = async (todo: Todo) => {
    try {
      const updatedTodos = allTodo.map(prev =>
        prev.id === todo.id ? todo : prev,
      );
      await AsyncStorage.setItem(
        STORAGE_TODO_KEY,
        JSON.stringify(updatedTodos),
      );
      setAllTodo(updatedTodos);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (todo: Todo) => {
    try {
      const updatedTodos = allTodo.filter(prev => prev.id !== todo.id);
      await AsyncStorage.setItem(
        STORAGE_TODO_KEY,
        JSON.stringify(updatedTodos),
      );
      setAllTodo(updatedTodos);
    } catch (err) {
      console.error(err);
    }
  };

  return {saveTodo, loadTodos, updateTodo, deleteTodo};
};
