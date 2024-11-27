import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {RenderProp} from './SignUpStep_1';
import {theme} from '../../../style/Theme';

const SignUpStep_5 = ({setStep}: RenderProp) => {
  const [validNumber, setValidNumber] = useState<string>('');
  const [alert, setAlert] = useState<boolean>(false);
  const [onFocus, setOnFocus] = useState<boolean>(false);

  if (setStep === undefined) {
    return;
  }

  const onClickBtn = () => {
    // 휴대폰으로 인증번호 발송 SDK 필요
    setStep(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={theme.typography.h2}>
          휴대폰으로 발송된 인증번호를 입력해주세요
        </Text>
        <TextInput
          value={validNumber}
          onChangeText={setValidNumber}
          onChange={() => setAlert(false)}
          style={[
            theme.signUpTextInputContainer,
            onFocus && {borderColor: theme.colors.primary.main},
          ]}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
        />
      </View>

      <View>
        <TouchableOpacity
          style={theme.buttonContainerStyle}
          onPress={onClickBtn}>
          <Text style={theme.buttonTextStyle}>인증하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpStep_5;

const styles = StyleSheet.create({
  container: {
    gap: 40,
  },
  contentContainer: {
    gap: 8,
  },
});
