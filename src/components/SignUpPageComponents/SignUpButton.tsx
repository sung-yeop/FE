import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {SignUpInfo, Step, StepKey} from '../../types';
import {StepToStepKey} from '../../util/SignUpStepUtils';
import {sendSignUpData} from '../../api/Api';

type Props = {
  step: number;
  isValidNextPage: Step;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setClickFlag: React.Dispatch<React.SetStateAction<boolean>>;
  formData: SignUpInfo;
};

const SignUpButton = ({
  step,
  isValidNextPage,
  setStep,
  setClickFlag,
  formData,
}: Props) => {
  const key = StepToStepKey(step) as StepKey;

  const nextStep = () => {
    if (isValidNextPage[key]) {
      setStep(prev => prev + 1);
    } else {
      setClickFlag(true);
    }
  };

  // const singUpComplete = () => {
  //   sendSignUpData(formData);
  // };

  return (
    <View style={styles.buttonContainer}>
      {step === 1 ? (
        <TouchableOpacity style={styles.button} onPress={nextStep}>
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      ) : step === 2 ? (
        <TouchableOpacity style={styles.button} onPress={nextStep}>
          <Text style={styles.buttonText}>인증 번호 요청</Text>
        </TouchableOpacity>
      ) : step === 3 ? (
        <TouchableOpacity style={styles.button} onPress={nextStep}>
          <Text style={styles.buttonText}>인증 하기</Text>
        </TouchableOpacity>
      ) : step === 4 ? (
        <TouchableOpacity style={styles.button} onPress={nextStep}>
          <Text style={styles.buttonText}>인증 번호 요청</Text>
        </TouchableOpacity>
      ) : step === 5 ? (
        <TouchableOpacity style={styles.button} onPress={nextStep}>
          <Text style={styles.buttonText}>인증 하기</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>회원 가입 완료</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SignUpButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 10,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 15,
  },
});
