import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {Todo} from '../../types';
import {TodoContext} from './TodoContext';

type Props = {
  todo: Todo;
  onClickTodo: (selectTodo: Todo) => void;
};

const TodoItem = ({todo, onClickTodo}: Props) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onClickTodo(todo)}>
      {/* Primary Information */}
      <View style={styles.timeContainer}>
        <Text style={styles.dateText}>{todo.day}</Text>
        <Text style={styles.timeText}>{formatTime(todo.timer)}</Text>
      </View>

      {/* Secondary Information */}
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>{todo.title}</Text>
        {todo.description && (
          <Text style={styles.descriptionText}>{todo.description}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center', // baseline에서 center로 변경
    gap: 8,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    letterSpacing: -0.5,
    lineHeight: 24, // lineHeight 추가
    includeFontPadding: false, // 폰트 패딩 제거
  },
  timeText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    lineHeight: 24, // lineHeight 추가
    includeFontPadding: false, // 폰트 패딩 제거
  },
  contentContainer: {
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
    paddingLeft: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
