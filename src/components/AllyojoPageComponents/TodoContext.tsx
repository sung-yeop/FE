import React, {createContext, useState, useContext, useEffect} from 'react';
import {Todo} from '../../types';
import uuid from 'react-native-uuid';
import {TodoUtil} from '../../util/TodoUtils';

interface TodoContextType {
  currentTodo: Todo;
  setCurrentTodo: React.Dispatch<React.SetStateAction<Todo>>;
  updateTodo: (updates: Partial<Todo>) => void;
}

export const TodoContextManager = createContext<TodoContextType | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
  todo: Todo | undefined;
};

export const TodoContext = ({children, todo}: Props) => {
  const defaultTodo: Todo = {
    id: uuid
      .v4()
      .toString()
      .replace(/[^\d]+/g, '')
      .slice(0, 10),
    title: '',
    description: '',
    timer: new Date(),
    day: TodoUtil.parseDayFromDate(new Date()),
  };

  const [currentTodo, setCurrentTodo] = useState<Todo>(todo || defaultTodo);

  const updateTodo = (updates: Partial<Todo>) => {
    setCurrentTodo(prev => ({...prev, ...updates}));
  };

  return (
    <TodoContextManager.Provider
      value={{currentTodo, setCurrentTodo, updateTodo}}>
      {children}
    </TodoContextManager.Provider>
  );
};
