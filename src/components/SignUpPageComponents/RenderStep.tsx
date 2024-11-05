import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SignUpInfo, Step} from '../../types';

type Props = {
  step: number;
  setIsValidNextPage: React.Dispatch<React.SetStateAction<Step>>;
  formData: SignUpInfo;
  updateFormData: (key: string, value: string) => void;
};

const RenderStep = ({
  step,
  setIsValidNextPage,
  formData,
  updateFormData,
}: Props) => {
  const {
    username,
    password,
    validPassword,
    notificationNumber,
    name,
    phoneNumber,
    guardianPhoneNumber,
    isGuardian,
  } = {...formData};

  const [isValidPassWord, setIsValidPassWord] = useState<boolean>(false);
  const [isValidPhoneNumberLength, setIsValidPhoneNumberLength] =
    useState<boolean>(false);

  // 첫번째 페이지
  // 비밀번호 확인
  useEffect(() => {
    if (password.length > 7 && password === validPassword) {
      setIsValidPassWord(true);
    } else {
      setIsValidPassWord(false);
    }
  }, [password, validPassword]);

  // validate 첫번째 페이지
  // TODO : email 체크 필요
  useEffect(() => {
    if (isValidPassWord) {
      setIsValidNextPage(prevStep => {
        return {
          ...prevStep,
          step1: true,
        };
      });
    } else {
      setIsValidNextPage(prevStep => {
        return {
          ...prevStep,
          step1: false,
        };
      });
    }
  }, [isValidPassWord]);
  ////////////////////////////////////////
  // 두번째 페이지
  useEffect(() => {
    console.log(phoneNumber.length);
    if (phoneNumber.length === 11) {
      console.log('ENTER');
      setIsValidPhoneNumberLength(true);
    } else {
      setIsValidPhoneNumberLength(false);
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (isValidPhoneNumberLength) {
      setIsValidNextPage(prevStep => {
        return {
          ...prevStep,
          step2: true,
        };
      });
    } else {
      setIsValidNextPage(prevStep => {
        return {
          ...prevStep,
          step2: false,
        };
      });
    }
    //TODO : 문자메세지로 휴대폰 인증 필요
    // 여기서 문자메세지 인증을 시도하는 기능을 추가해야함
  }, [isValidPhoneNumberLength]);
  ////////////////////////////////////////
  // 세번째 페이지
  useEffect(() => {
    setIsValidNextPage(prevStep => {
      return {
        ...prevStep,
        step3: true,
      };
    });
  }, [notificationNumber]);
  ////////////////////////////////////////
  /// 네번째 페이지
  useEffect(() => {
    if (guardianPhoneNumber?.length === 11) {
      setIsValidNextPage(prevStep => {
        return {
          ...prevStep,
          step4: true,
        };
      });
    } else {
      setIsValidNextPage(prevStep => {
        return {
          ...prevStep,
          step4: false,
        };
      });
    }
  }, [guardianPhoneNumber]);
  /////////////////////////////////////////
  // 다섯번째 페이지
  useEffect(() => {
    setIsValidNextPage(prevStep => {
      return {
        ...prevStep,
        step5: true,
      };
    });
  }, [notificationNumber]);
  //////////////////////////////////////
  // 여섯번째 페이지
  useEffect(() => {
    if (name) {
      setIsValidNextPage(prevStep => {
        return {
          ...prevStep,
          step6: true,
        };
      });
    }
    // TODO : 백엔드로 데이터 저장하기
    // username
    // name
    // phonenumber
    // isGuardian
    // guardianPhoneNumber
  }, [name]);
  ///

  switch (step) {
    case 1:
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.title}>
            앞으로 사용할 아이디와 비밀번호를 입력해주세요!
          </Text>
          <View style={styles.inputIdContainer}>
            <View style={styles.inputIdContent}>
              <Text style={styles.inputTitleText}>아이디</Text>
              <TextInput
                style={styles.inputText}
                value={username}
                onChangeText={text => updateFormData('username', text)}
                keyboardType="email-address"
              />
            </View>
            <TouchableOpacity style={styles.checkButtonContainer}>
              <Text style={styles.checkButtonText}>중복확인</Text>
            </TouchableOpacity>
          </View>
          <View
            style={
              isValidPassWord ? styles.validInputContent : styles.inputContent
            }>
            <Text style={styles.inputTitleText}>비밀번호</Text>
            <TextInput
              style={styles.inputText}
              value={password}
              secureTextEntry
              onChangeText={text => updateFormData('password', text)}
            />
          </View>
          <View
            style={
              isValidPassWord ? styles.validInputContent : styles.inputContent
            }>
            <View style={styles.inputTitleContainer}>
              <Text style={styles.inputTitleText}>비밀번호 재확인</Text>
              {isValidPassWord && (
                <Text style={styles.inputTitleText}>비밀번호가 일치합니다</Text>
              )}
            </View>
            <TextInput
              style={styles.inputText}
              value={validPassword}
              secureTextEntry
              onChangeText={text => updateFormData('validPassword', text)}
            />
          </View>
        </View>
      );
    case 2:
      return (
        <View>
          <Text style={styles.title}>휴대폰 번호를 입력해주세요</Text>
          <TextInput
            style={styles.inputOtherInfoText}
            value={phoneNumber}
            onChangeText={text => updateFormData('phoneNumber', text)}
            placeholder="휴대폰 번호"
            keyboardType="phone-pad"
          />
        </View>
      );
    case 3:
      return (
        <View>
          <Text style={styles.title}>인증번호를 입력해주세요</Text>
          <TextInput
            style={styles.inputOtherInfoText}
            value={notificationNumber}
            onChangeText={text => updateFormData('notificationNumber', text)}
            placeholder="인증번호"
            keyboardType="phone-pad"
          />
        </View>
      );
    case 4:
      return (
        <View>
          <Text style={styles.title}>
            보호자가 있다면 {`\n`}보호자의 휴대폰 번호를 입력해주세요
          </Text>
          <TextInput
            style={styles.inputOtherInfoText}
            value={guardianPhoneNumber}
            onChangeText={text => updateFormData('guardianPhoneNumber', text)}
            placeholder="보호자 연락처"
            keyboardType="phone-pad"
          />
          <TouchableOpacity>
            <Text style={styles.jumpText}>건너뛰기</Text>
          </TouchableOpacity>
        </View>
      );
    case 5:
      return (
        <View>
          <Text style={styles.title}>인증번호를 입력해주세요</Text>
          <TextInput
            style={styles.inputOtherInfoText}
            value={notificationNumber}
            onChangeText={text => updateFormData('notificationNumber', text)}
            placeholder="인증번호"
            keyboardType="phone-pad"
          />
        </View>
      );
    case 6:
      return (
        <View>
          <Text style={styles.title}>사용할 닉네임을 입력해주세요!</Text>
          <TextInput
            style={styles.inputOtherInfoText}
            value={name}
            onChangeText={text => updateFormData('name', text)}
            placeholder="닉네임"
          />
        </View>
      );
    default:
      return null;
  }
};

export default RenderStep;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    gap: 5,
  },
  inputIdContent: {
    borderColor: '#ddd',
    width: '70%',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  inputContent: {
    borderColor: '#ddd',
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  validInputContent: {
    borderColor: 'green',
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  inputTitleText: {
    marginLeft: 8,
    marginRight: 8,
    paddingTop: 5,
    fontSize: 12,
  },
  inputText: {
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  inputOtherInfoText: {
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 15,
    backgroundColor: 'white',
    fontSize: 16,
    color: 'gray',
  },
  inputTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputIdContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  checkButtonContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: 'black',
  },
  checkButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  jumpText: {
    fontWeight: 'bold',
    marginLeft: 6,
    paddingVertical: 10,
  },
});
