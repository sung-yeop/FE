import {useContext} from 'react';
import {TodoContextManager} from '../components/AllyojoPageComponents/TodoContext';

export const useCurrentTodo = () => {
  const context = useContext(TodoContextManager);
  if (context === undefined) {
    throw new Error(
      'TodoContextManager가 관리하는 범위 내부에서 훅을 호출해야합니다',
    );
  }
  return context;
};
