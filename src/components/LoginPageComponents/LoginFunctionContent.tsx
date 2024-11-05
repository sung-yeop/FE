import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

type AlarmScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp',
  'FindPassWord'
>;

const LoginFunctionContent = () => {
  const navigator = useNavigation<AlarmScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigator.navigate('SignUp')}>
        <Text>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigator.navigate('FindPassWord')}>
        <Text>비밀번호 찾기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginFunctionContent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
