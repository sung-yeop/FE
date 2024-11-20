import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RenderStep from '../components/SignUpPageComponents/RenderStep';
import {SignUpInfo, Step} from '../types';
import SignUpHeader from '../components/SignUpPageComponents/SignUpHeader';
import SignUpButton from '../components/SignUpPageComponents/SignUpButton';
import {sendSignUpWithGuardian, sendSignUpWithUser} from '../api/SignAPI';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

const SignUpPage = () => {
  const navigation = useNavigation<NavigationProp>();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SignUpInfo>({
    username: '', // 사용할 아이디
    password: '', // 사용할 패스워드
    validPassword: '', // 패스워드 재확인
    notificationNumber: '', // 인증번호
    name: '', // 사용할 닉네임
    phoneNumber: '',
    isGuardian: false,
  });
  const [isValidNextPage, setIsValidNextPage] = useState<Step>({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
  });
  const [clickFlag, setClickFlag] = useState<boolean>(false);

  const updateFormData = (key: string, value: string | boolean) => {
    setFormData(prevData => ({...prevData, [key]: value}));
  };

  useEffect(() => {
    setClickFlag(false);
    if (step === 1) {
      setFormData({
        username: '', // 사용할 아이디
        password: '', // 사용할 패스워드
        validPassword: '', // 패스워드 재확인
        notificationNumber: '', // 인증번호
        name: '', // 사용할 닉네임
        phoneNumber: '',
        isGuardian: false,
      });
      setIsValidNextPage({
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5: false,
      });
    }
  }, [step]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSignUpButton = () => {
    if (formData.isGuardian) {
      sendSignUpWithGuardian({
        username: formData.username,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        name: formData.name,
      });
    } else {
      sendSignUpWithUser({
        username: formData.username,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        name: formData.name,
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
      <SignUpHeader step={step} setStep={setStep} />
      <View style={styles.contentContainer}>
        <RenderStep
          step={step}
          formData={formData}
          setIsValidNextPage={setIsValidNextPage}
          updateFormData={updateFormData}
        />
        {clickFlag && (
          <Text style={styles.message}>
            입력정보가 정확하지 않습니다. 다시 확인해주세요
          </Text>
        )}
      </View>
      <SignUpButton
        step={step}
        isValidNextPage={isValidNextPage}
        setStep={setStep}
        setClickFlag={setClickFlag}
        handleSignUpButton={handleSignUpButton}
        updateFormData={updateFormData}
      />
    </View>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  contentContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  message: {
    marginHorizontal: 10,
    paddingVertical: 10,
    color: '#C93939',
    fontWeight: 'bold',
  },
});
