import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RenderProp} from './SignUpStep_1';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../App';
import {theme} from '../../../style/Theme';
import {SignUpAPI} from '../../../api/SignUpAPI';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

const SignUpStep_8 = ({current, updateCurrent, setStep}: RenderProp) => {
  const [name, setName] = useState<string>('');
  const navigation = useNavigation<NavigationProp>();

  if (
    current === undefined ||
    updateCurrent === undefined ||
    setStep === undefined
  ) {
    return;
  }

  useEffect(() => {
    updateCurrent({name: ''});
  }, []);

  useEffect(() => {
    updateCurrent({name: name});
  }, [name]);

  const onClickBtn = async () => {
    if (current?.isGuardian) {
      await SignUpAPI.sendSignUpWithGuardian({
        username: current.username,
        name: current.name,
        phoneNumber: current.phoneNumber,
        password: current.password,
      });
    } else {
      if (current.age === undefined || current.gender === undefined) {
        throw new Error(
          '회원 가입 정보 중에서 age, gender가 설정되지 않았습니다.',
        );
      }

      await SignUpAPI.sendSignUpWithUser({
        username: current.username,
        name: current.name,
        phoneNumber: current.phoneNumber,
        password: current.password,
        age: current.age,
        gender: current.gender,
      });
    }
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'SignIn',
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={theme.typography.h2}>
          마지막으로 사용할 닉네임을 입력해주세요
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={theme.signUpTextInputContainer}
        />
      </View>
      <TouchableOpacity style={theme.buttonContainerStyle} onPress={onClickBtn}>
        <Text style={theme.buttonTextStyle}>회원가입 완료</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpStep_8;

const styles = StyleSheet.create({
  container: {
    gap: 40,
  },
  contentContainer: {
    gap: 8,
  },
});
