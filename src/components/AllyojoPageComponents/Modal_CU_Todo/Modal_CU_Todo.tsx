import {Modal, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import TodoModalHeader from './TodoModalHeader';
import {Todo} from '../../../types';
import {TodoContext} from '../TodoContext';
import Modal_CU_Todo_Content from './Modal_CU_Todo_Content';
import Modal_CU_SaveButton from './Modal_CU_SaveButton';

type Props = {
  isVisible: boolean;
  onCloseModal: () => void;
  todo?: Todo;
};

const Modal_CU_Todo = ({isVisible, onCloseModal, todo}: Props) => {
  return (
    <Modal
      visible={isVisible}
      onRequestClose={onCloseModal}
      animationType="slide"
      transparent={false}>
      <SafeAreaProvider>
        <SafeAreaView>
          <ScrollView>
            <TodoContext todo={todo || undefined}>
              <View style={styles.modalContainer}>
                <TodoModalHeader onCloseModal={onCloseModal} />
                <Modal_CU_Todo_Content />
                <Modal_CU_SaveButton
                  id={todo?.id}
                  onCloseModal={onCloseModal}
                />
              </View>
            </TodoContext>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

export default Modal_CU_Todo;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
  },
});
