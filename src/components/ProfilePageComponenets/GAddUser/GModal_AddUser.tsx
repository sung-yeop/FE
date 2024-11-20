import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GuardianAPI} from '../../../api/GuardianAPI';
import {useRecoilState} from 'recoil';
import {allManagingSeniorsSelector} from '../../../atoms';

type Props = {
  isVisibleModal: boolean;
  onCloseModal: () => void;
};

const GModal_AddUser = ({isVisibleModal, onCloseModal}: Props) => {
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const isValid = useRef<boolean>(false);
  const [seniors, setSeniors] = useRecoilState(allManagingSeniorsSelector);

  const onClickSaveButton = async () => {
    if (!isValid.current) {
      Alert.alert('주의', '휴대폰 번호는 11자리 입니다.', [
        {
          text: '확인',
          style: 'cancel',
        },
      ]);
      return;
    }

    try {
      await GuardianAPI.addSenior(userPhoneNumber);
      console.log('Senior added successfully');

      const response = await GuardianAPI.getSeniors();
      console.log('Fetched seniors:', response);

      if (response) {
        setSeniors(response);
        onCloseModal();
      }
    } catch (error) {
      console.error('Error in onClickSaveButton:', error);
      Alert.alert('오류', '처리 중 문제가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (userPhoneNumber.length === 11) {
      isValid.current = true;
      return;
    }
    isValid.current = false;
  }, [userPhoneNumber]);

  useEffect(() => {
    console.log('Recoil Seniors : ', seniors);
  }, [seniors]);

  return (
    <Modal
      visible={isVisibleModal}
      onRequestClose={onCloseModal}
      animationType="fade"
      transparent={true}>
      <SafeAreaProvider>
        <TouchableWithoutFeedback onPress={onCloseModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
              <View style={styles.modalContainer}>
                <Text>관리할 유저의 연락처를 입력해주세요</Text>
                <TextInput
                  style={styles.inputText}
                  value={userPhoneNumber}
                  onChangeText={setUserPhoneNumber}
                />
                <TouchableOpacity onPress={onClickSaveButton}>
                  <Text>등록하기</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaProvider>
    </Modal>
  );
};

export default GModal_AddUser;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 40,
    flex: 0.2,
    padding: 20,
    borderWidth: 1,
    borderColor: 'gray',
    bottom: 40,
  },
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  ContentContainer: {
    flexDirection: 'column',
    gap: 10,
    paddingVertical: 10,
  },
  Content: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  ContentText: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
  inputText: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'black',
  },
});
