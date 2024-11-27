import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RenderProp} from './SignUpStep_1';
import {theme} from '../../../style/Theme';

const SignUpStep_2 = ({updateCurrent, setStep}: RenderProp) => {
  const [password, setPassword] = useState<string>();
  const [alert, setAlert] = useState<boolean>(false);
  const [onFocus, setOnFocus] = useState<boolean>(false);

  if (updateCurrent === undefined || setStep === undefined) {
    return;
  }

  useEffect(() => {
    updateCurrent({password: ''});
  }, []);

  const onClickBtn = () => {
    if (password === undefined || password.length < 3) {
      setAlert(true);
      return;
    }
    updateCurrent({password: password});
    setStep(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={theme.typography.h2}>비밀번호를 입력해주세요</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          style={[
            theme.signUpTextInputContainer,
            onFocus && {borderColor: theme.colors.primary.main},
          ]}
          secureTextEntry
        />
      </View>
      <View>
        {alert && (
          <Text style={theme.signUpAlertMessgaeStyle}>
            비밀번호는 3자 이상이어야 합니다
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

export default SignUpStep_2;

const styles = StyleSheet.create({
  container: {
    gap: 40,
  },
  contentContainer: {
    gap: 8,
  },
});
