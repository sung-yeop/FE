import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {useNavigation} from '@react-navigation/native';
import {useResetRecoilState} from 'recoil';
import {userState} from '../../atoms';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

const LogoutBtn = () => {
  const navigation = useNavigation<NavigationProp>();
  const resetUser = useResetRecoilState(userState);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={async () => {
        await AsyncStorage.clear();
        resetUser();
        navigation.navigate('SignIn');
      }}>
      <Text style={styles.logoutText}>로그아웃</Text>
    </TouchableOpacity>
  );
};

export default LogoutBtn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: 'gray',
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '500',
  },
});
