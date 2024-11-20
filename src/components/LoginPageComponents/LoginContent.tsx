import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  sendSignInDataWithGuardian,
  sendSignInDataWithUser,
} from '../../api/SignAPI';
import MailSVG from '../../../asset/images/Mail Icon.svg';
import LockSVG from '../../../asset/images/Lock Fill Icon.svg';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import LoginFunctionContent from './LoginFunctionContent';
import {theme} from '../../style/Theme';

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Bottom',
  'BottomTabGuardian'
>;

const LoginContent = () => {
  const navigation = useNavigation<NavigationProps>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isGurdian, setIsGurdian] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      if (isGurdian) {
        await sendSignInDataWithGuardian({username, password});
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'BottomTabGuardian',
              params: {screen: '알람'},
            },
          ],
        });
        return;
      }
      await sendSignInDataWithUser({username, password});
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Bottom',
            params: {screen: '알려줘'},
          },
        ],
      });
    } catch (err) {
      throw err;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputTitleText}>이메일</Text>
      <View style={styles.inputContainer}>
        <MailSVG width={20} height={20} style={styles.inputIcon} />
        <TextInput
          style={[styles.inputText, {paddingLeft: 40}]}
          value={username}
          onChangeText={setUsername}
          placeholder="이메일을 입력해 주세요"
          placeholderTextColor={'gray'}
        />
      </View>
      <Text style={styles.inputTitleText}>비밀번호</Text>
      <View style={styles.inputContainer}>
        <LockSVG width={20} height={20} style={styles.inputIcon} />
        <TextInput
          style={styles.inputText}
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호를 입력해 주세요"
          secureTextEntry
        />
      </View>
      <LoginFunctionContent />
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isGurdian}
          onValueChange={setIsGurdian}
          tintColors={{true: 'black', false: 'gray'}}
        />
        <Text style={styles.checkboxText}>보호자 회원인가요?</Text>
      </View>
      <TouchableOpacity
        style={theme.buttonContainerStyle}
        onPress={handleLogin}>
        <Text style={[theme.buttonTextStyle, {paddingVertical: 4}]}>
          로그인
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginContent;

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  inputContent: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  inputTitleText: {
    paddingTop: 5,
    fontSize: 14,
    marginLeft: 2,
    fontFamily: 'Pretendard-Bold',
    color: 'black',
  },
  buttonContainer: {
    width: '100%',
    padding: 16,
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  checkboxText: {
    color: 'black',
    fontFamily: 'Pretendard-Bold',
    marginLeft: 8,
    fontSize: 16,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F4FF',
    borderRadius: 16,
    paddingLeft: 4,
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    color: 'gray',
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 16,
    paddingLeft: 40, // 아이콘 공간
    paddingRight: 20,
    fontFamily: 'Pretendard-Regular',
  },
});
