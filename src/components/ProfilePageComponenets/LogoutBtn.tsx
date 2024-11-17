import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {useNavigation} from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

const LogoutBtn = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <TouchableOpacity
      onPress={async () => {
        await AsyncStorage.setItem('token', '');
        navigation.navigate('SignIn');
      }}>
      <Text>로그아웃</Text>
    </TouchableOpacity>
  );
};

export default LogoutBtn;

const styles = StyleSheet.create({});
