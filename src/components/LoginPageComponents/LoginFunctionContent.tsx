import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

type AlarmScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FindPassWord'
>;

const LoginFunctionContent = () => {
  const navigator = useNavigation<AlarmScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigator.navigate('FindPassWord')}>
        <Text>아이디/비밀번호 찾기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginFunctionContent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
});
