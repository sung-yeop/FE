import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  sendSignInDataWithGuardian,
  sendSignInDataWithUser,
} from '../../api/SignAPI';
import CheckBox from '@react-native-community/checkbox';

const LoginContent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isGurdian, setIsGurdian] = useState<boolean>(false);

  const handleLogin = () => {
    if (isGurdian) {
      sendSignInDataWithGuardian({username, password});
    }
    sendSignInDataWithUser({username, password});
  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../assets/login-image.png')}
        style={styles.image}
      /> */}

      <View style={styles.inputContent}>
        <Text style={styles.inputTitleText}>아이디</Text>
        <TextInput
          style={styles.inputText}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputContent}>
        <Text style={styles.inputTitleText}>비밀번호</Text>
        <TextInput
          style={styles.inputText}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isGurdian}
          onValueChange={setIsGurdian}
          tintColors={{true: 'black', false: 'gray'}}
        />
        <Text style={styles.checkboxText}>보호자 회원인가요?</Text>
      </View>
    </View>
  );
};

export default LoginContent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    gap: 8,
  },
  inputContent: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  inputTitleText: {
    marginLeft: 8,
    paddingTop: 5,
    fontSize: 12,
  },
  inputText: {
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 2,
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
  },
  checkboxText: {
    color: 'black',
    fontFamily: 'Pretendard-Bold',
    marginLeft: 8,
  },
});
