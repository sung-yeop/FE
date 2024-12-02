import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {Todo} from '../../types';
import CustomSwipeable from '../../util/CustomSwipeable';
import {useTodoManager} from '../../hooks/useTodoManager';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TodoUtil} from '../../util/TodoUtils';
import {CalenderImg} from '../../../asset/images';
import {theme} from '../../style/Theme';

type Props = {
  todo: Todo;
  onClickTodo: (selectTodo: Todo) => void;
};

const TodoItem = ({todo, onClickTodo}: Props) => {
  const {deleteTodo} = useTodoManager();
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const rightComponent = (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => deleteTodo(todo)}>
      <Icon name="delete-outline" size={32} color="white" />
      <Text style={styles.deleteText}>삭제</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.todoContainer}>
      <CustomSwipeable rightComponent={rightComponent}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => onClickTodo(todo)}
          activeOpacity={0.7}>
          <View style={styles.timeContainer}>
            <View style={styles.dateContainer}>
              <View style={styles.dDayWrapper}>
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      gap: 6,
                      backgroundColor: theme.colors.primary.light,
                      padding: 10,
                      borderRadius: 30,
                    },
                  ]}>
                  <Image source={CalenderImg} style={[styles.calendarIcon]} />
                  <Text style={[styles.dDayTextStyle, {color: 'white'}]}>
                    {TodoUtil.calculateDday(todo.day)}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.timeWrapper}>
              <Text style={styles.dateText}>{todo.day}</Text>
              <View style={{flexDirection: 'row', gap: 6}}>
                <Icon name="access-time" size={20} color="#666" />
                <Text style={styles.timeText}>{formatTime(todo.timer)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.titleText} numberOfLines={1}>
              {todo.title}
            </Text>
            {todo.description && (
              <Text style={styles.descriptionText} numberOfLines={2}>
                {todo.description}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </CustomSwipeable>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  todoContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'gray',
    marginVertical: 6,
  },
  container: {
    backgroundColor: 'white',
    padding: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeWrapper: {
    gap: 2,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: theme.colors.primary.light, // 테두리 색상을 primary.light로
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dateText: {
    fontSize: 16,
    color: theme.colors.primary.dark, // 진한 파란색으로
    fontFamily: 'Pretendard-Bold',
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: 20,
    marginTop: 0,
    marginLeft: 6,
  },
  timeText: {
    fontSize: 14,
    color: theme.colors.primary.main,
    fontWeight: '500',
    includeFontPadding: false,
  },
  dateContainer: {
    paddingVertical: 6,
    flexDirection: 'row',
  },
  dDayWrapper: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
  },
  calendarIcon: {
    width: 25,
    height: 25,
  },
  contentContainer: {
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
    color: 'black',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  descriptionText: {
    fontFamily: 'Pretendard-Regular',
    color: '#666',
    fontSize: 16,
    lineHeight: 20,
  },
  deleteButton: {
    backgroundColor: '#e91141',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    gap: 8,
  },
  deleteText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  dDayTextStyle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: '#007AFF',
    includeFontPadding: false,
  },
});
