import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import GModal_AddUser from './GModal_AddUser';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GAddUser = () => {
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [isGuardian, setIsGuardian] = useState<boolean>(false);

  useEffect(() => {
    const guardianCheck = async () => {
      try {
        const response = await AsyncStorage.getItem('isGuardian');
        setIsGuardian(response === 'Yes');
      } catch (error) {
        console.error('Error checking guardian status:', error);
      }
    };

    guardianCheck();
  }, []);

  return (
    <View>
      {isGuardian && (
        <View>
          <TouchableOpacity onPress={() => setIsVisibleModal(true)}>
            <Text>사용자 추가</Text>
          </TouchableOpacity>
          <GModal_AddUser
            isVisibleModal={isVisibleModal}
            onCloseModal={() => setIsVisibleModal(false)}
          />
        </View>
      )}
    </View>
  );
};

export default GAddUser;

const styles = StyleSheet.create({});
