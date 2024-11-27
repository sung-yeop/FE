import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {RenderProp} from './SignUpStep_1';
import {theme} from '../../../style/Theme';

const SignUpStep_3 = ({current, updateCurrent, setStep}: RenderProp) => {
  const [validPassWord, setValidPassWord] = useState<string>('');
  const [alert, setAlert] = useState<boolean>(false);
  const [shouldProceed, setShouldProceed] = useState<boolean>(false);
  const [onFocus, setOnFocus] = useState<boolean>(false);

  if (
    current === undefined ||
    updateCurrent === undefined ||
    setStep === undefined
  ) {
    return;
  }

  useEffect(() => {
    if (shouldProceed) {
      setStep(prev => prev + 1);
      setShouldProceed(false);
    }
  }, [shouldProceed, setStep]);

  const onClickBtn = () => {
    if (current?.password === validPassWord) {
      setAlert(false);
      setShouldProceed(true);
    } else {
      setAlert(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={theme.typography.h2}>
          비밀번호를 다시 한번 입력해주세요!
        </Text>
        <TextInput
          value={validPassWord}
          style={[
            theme.signUpTextInputContainer,
            onFocus && {borderColor: theme.colors.primary.main},
          ]}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          onChangeText={setValidPassWord}
          onChange={() => setAlert(false)}
          secureTextEntry
        />
      </View>
      <View>
        {alert && (
          <Text style={theme.signUpAlertMessgaeStyle}>
            비밀번호가 일치하지 않습니다
          </Text>
        )}
        <TouchableOpacity
          style={theme.buttonContainerStyle}
          onPress={onClickBtn}>
          <Text style={theme.buttonTextStyle}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpStep_3;

const styles = StyleSheet.create({
  container: {
    gap: 40,
  },
  contentContainer: {
    gap: 8,
  },
});
