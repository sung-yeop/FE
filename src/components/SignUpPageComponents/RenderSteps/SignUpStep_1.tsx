import {
  StyleSheet,
  Text,
  TextInput,
  TextInputComponent,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useCurrentSignUpInfo} from '../../../hooks/useCurrentSignUpInfo';
import {SignUpAPI} from '../../../api/SignUpAPI';
import {SignUpInfo} from '../../../types';
import {theme} from '../../../style/Theme';

export type RenderProp = {
  current?: SignUpInfo;
  updateCurrent?: (updates: Partial<SignUpInfo>) => void;
  step?: number;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
};

const SignUpStep_1 = ({updateCurrent, setStep}: RenderProp) => {
  const [userId, setUserId] = useState('');
  const [alert, setAlert] = useState<boolean>(false);
  const [onFocus, setOnFocus] = useState<boolean>(false);

  if (updateCurrent === undefined || setStep === undefined) {
    return;
  }

  useEffect(() => {
    updateCurrent({
      username: '',
      password: '',
      name: '',
      phoneNumber: '',
      isGuardian: false,
    });
  }, []);

  const onClickBtn = async () => {
    const response = await SignUpAPI.checkDuplicateUsername(userId);
    if (!response.isDuplicate) {
      updateCurrent({username: userId});
      setStep(2);
      return;
    }
    setAlert(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={theme.typography.h2}>
          앞으로 사용하실 아이디를 입력해주세요
        </Text>
        <TextInput
          style={[
            theme.signUpTextInputContainer,
            onFocus && {borderColor: theme.colors.primary.main},
          ]}
          value={userId}
          onChangeText={setUserId}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          onChange={() => setAlert(false)}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View>
        {alert && (
          <Text style={[theme.signUpAlertMessgaeStyle, {fontSize: 16}]}>
            이미 사용중인 아이디입니다.
          </Text>
        )}
        <TouchableOpacity
          style={theme.signUpButtonContainer}
          onPress={onClickBtn}>
          <Text style={theme.buttonTextStyle}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpStep_1;

const styles = StyleSheet.create({
  container: {
    gap: 40,
  },
  contentContainer: {
    gap: 8,
  },
});
