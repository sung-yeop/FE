import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import GModal_AddUser from './GModal_AddUser';

const GAddUser = () => {
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setIsVisibleModal(true)}>
        <Text>사용자 추가</Text>
      </TouchableOpacity>
      <GModal_AddUser
        isVisibleModal={isVisibleModal}
        onCloseModal={() => setIsVisibleModal(false)}
      />
    </View>
  );
};

export default GAddUser;

const styles = StyleSheet.create({});
