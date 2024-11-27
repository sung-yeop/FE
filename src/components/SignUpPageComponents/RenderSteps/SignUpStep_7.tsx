import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {RenderProp} from './SignUpStep_1';
import {theme} from '../../../style/Theme';

const SignUpStep_7 = ({updateCurrent, setStep}: RenderProp) => {
  const [age, setAge] = useState<number>();
  const [gender, setGender] = useState<string>('');
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);

  if (updateCurrent === undefined || setStep === undefined) {
    return;
  }

  const ageRange = Array.from({length: 45}, (_, i) => (i + 30).toString());

  // 성별 옵션
  const genderOptions = [
    {label: '남성', value: 'MALE'},
    {label: '여성', value: 'FEMALE'},
  ];

  const handleNext = () => {
    if (age && gender) {
      updateCurrent({age: age, gender: gender});
      setStep(prev => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={theme.typography.h2}>
        사용자분의 나이와 성별을 입력해주세요
      </Text>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => setShowAgeModal(true)}>
          <Text>{age ? `${age}세` : '나이를 선택해주세요'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => setShowGenderModal(true)}>
          <Text>
            {gender
              ? genderOptions.find(g => g.value === gender)?.label
              : '성별을 선택해주세요'}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showAgeModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>나이 선택</Text>
            <ScrollView>
              {ageRange.map(item => (
                <TouchableOpacity
                  key={item}
                  style={styles.modalItem}
                  onPress={() => {
                    setAge(Number(item));
                    setShowAgeModal(false);
                  }}>
                  <Text>{item}세</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowAgeModal(false)}>
              <Text>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 성별 선택 모달 */}
      <Modal visible={showGenderModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>성별 선택</Text>
            {genderOptions.map(option => (
              <TouchableOpacity
                key={option.value}
                style={styles.modalItem}
                onPress={() => {
                  setGender(option.value);
                  setShowGenderModal(false);
                }}>
                <Text>{option.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowGenderModal(false)}>
              <Text>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 다음 버튼 */}
      <TouchableOpacity
        style={[
          theme.buttonContainerStyle,
          (!age || !gender) && styles.nextButtonDisabled,
        ]}
        onPress={handleNext}
        disabled={!age || !gender}>
        <Text style={theme.buttonTextStyle}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 40,
  },
  contentContainer: {
    gap: 8,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  selectButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignUpStep_7;
