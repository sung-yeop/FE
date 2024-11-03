import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import WelcomContent from '../components/WelcomePageComponents/WelcomContent';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {sendSignUpData} from '../api/Api';
import {TestSignUpData} from '../data/TestMockData';

type AlarmScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignIn',
  'SignUp'
>;

// export interface SignUpInfo {
//   username: string;
//   password: string;
//   validPassword: string;
//   notificationNumber: string;
//   name: string;
//   phoneNumber: string;
//   guardianPhoneNumber: string | undefined;
//   isGuardian: boolean;
// }

const WelcomePage = () => {
  const navigator = useNavigation<AlarmScreenNavigationProp>();

  const testApi1 = () => {
    sendSignUpData({
      username: TestSignUpData.username,
      password: TestSignUpData.password,
      name: TestSignUpData.name,
      phoneNumber: TestSignUpData.phonenumber,
      isGuardian: TestSignUpData.isGuardian,
      guardianPhoneNumber: TestSignUpData.guardianPhoneNumber,
    });
  };

  return (
    <View style={styles.container}>
      <WelcomContent />
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.signInButtonContainer}
          onPress={() => navigator.navigate('SignIn')}>
          <Text style={styles.singInText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpButtonContainer}
          onPress={() => navigator.navigate('SignUp')}>
          <Text style={styles.singUpText}>회원가입</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={testApi1}>
        <Text>테스트 회원가입 - 보호자</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    gap: 30,
    marginHorizontal: 40,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  signInButtonContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flex: 0.5,
  },
  singInText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signUpButtonContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    flex: 0.5,
  },
  singUpText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
