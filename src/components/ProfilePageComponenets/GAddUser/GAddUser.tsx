import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import GModal_AddUser from './GModal_AddUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {theme} from '../../../style/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const GAddUser = () => {
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsVisibleModal(true)}
        activeOpacity={0.8}>
        <View style={styles.contentWrapper}>
          <Icon name="person-add" size={28} color="white" />
          <Text style={styles.text}>사용자 추가</Text>
        </View>
        <Icon name="arrow-forward-ios" size={20} color="white" />
      </TouchableOpacity>
      <GModal_AddUser
        isVisibleModal={isVisibleModal}
        onCloseModal={() => setIsVisibleModal(false)}
      />
    </View>
  );
};

export default GAddUser;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  button: {
    backgroundColor: theme.colors.primary.main,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
    includeFontPadding: false,
    textAlign: 'center',
  },
});
