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
import {theme} from '../../../style/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>사용자 추가</Text>
                  <TouchableOpacity
                    onPress={onCloseModal}
                    style={styles.closeButton}>
                    <Icon name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalContent}>
                  <Text style={styles.label}>
                    관리할 유저의 연락처를 입력해주세요
                  </Text>
                  <View style={styles.inputContainer}>
                    <Icon
                      name="phone"
                      size={20}
                      color={theme.colors.primary.main}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.inputText}
                      value={userPhoneNumber}
                      onChangeText={setUserPhoneNumber}
                      placeholder="전화번호 입력 (-없이 11자리)"
                      keyboardType="number-pad"
                      maxLength={11}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.saveButton,
                    {
                      backgroundColor: isValid.current
                        ? theme.colors.primary.main
                        : theme.colors.primary.light,
                    },
                  ]}
                  onPress={onClickSaveButton}>
                  <Text style={styles.saveButtonText}>등록하기</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'Pretendard-Bold',
    color: '#1a1a1a',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    gap: 12,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 8,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    color: '#1a1a1a',
    padding: 0,
  },
  saveButton: {
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
  },
});
