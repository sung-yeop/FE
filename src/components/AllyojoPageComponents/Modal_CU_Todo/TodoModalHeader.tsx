import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useCurrentTodo} from '../../../hooks/useCurrentTodo';

const TodoModalHeader = ({onCloseModal}: {onCloseModal: () => void}) => {
  const {currentTodo} = useCurrentTodo();

  useEffect(() => {
    console.log('<TodoModalHeader> currentTodo changed : ', currentTodo);
  }, [currentTodo]);

  return (
    <View style={styles.container}>
      <Entypo
        name="chevron-left"
        onPress={onCloseModal}
        size={30}
        color={'black'}
      />
    </View>
  );
};

export default TodoModalHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});
