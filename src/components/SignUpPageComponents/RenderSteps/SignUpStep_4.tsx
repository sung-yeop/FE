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

const SignUpStep_4 = ({updateCurrent, setStep}: RenderProp) => {
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [alert, setAlert] = useState<boolean>(false);
  const [onFocus, setOnFocus] = useState<boolean>(false);

  if (updateCurrent === undefined || setStep === undefined) {
    return;
  }

  useEffect(() => {
    updateCurrent({phoneNumber: ''});
  }, []);

  const onClickBtn = () => {
    if (phoneNumber?.length !== 11) {
      setAlert(true);
      return;
    }
    updateCurrent({phoneNumber: phoneNumber});
    setStep(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={theme.typography.h2}>연락처를 입력해주세요!</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
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
        {alert && (
          <Text style={theme.signUpAlertMessgaeStyle}>
            연락처는 11자리 입니다.
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

export default SignUpStep_4;

const styles = StyleSheet.create({
  container: {
    gap: 40,
  },
  contentContainer: {
    gap: 8,
  },
});
