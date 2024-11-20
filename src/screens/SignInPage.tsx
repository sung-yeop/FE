import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LoginContent from '../components/LoginPageComponents/LoginContent';
import LoginFunctionContent from '../components/LoginPageComponents/LoginFunctionContent';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginGNB from '../components/LoginPageComponents/LoginGNB';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type AlarmScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

const SignInPage = () => {
  const navigation = useNavigation<AlarmScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <LoginGNB />
        <LoginContent />
      </View>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>아직 회원이 아니신가요?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text
            style={[
              styles.signUpText,
              {
                borderBottomWidth: 0.7,
                color: '#2d608c',
                borderBottomColor: '#2d608c',
              },
            ]}>
            회원가입
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    backgroundColor: 'white',
    gap: 12,
    justifyContent: 'space-between',
  },

  signUpContainer: {
    marginBottom: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  signUpText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
  },
});
