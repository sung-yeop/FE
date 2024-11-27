import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {useNavigation} from '@react-navigation/native';
import {useCurrentSignUpInfo} from '../../hooks/useCurrentSignUpInfo';
import Icon from 'react-native-vector-icons/MaterialIcons';

type AlarmScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

const SignUpHeader = () => {
  const navigator = useNavigation<AlarmScreenNavigationProp>();
  const {step, setStep} = useCurrentSignUpInfo();

  return (
    <View style={styles.prevButtonContainer}>
      {step > 1 && (
        <TouchableOpacity onPress={() => setStep(prev => prev - 1)}>
          <Icon name="arrow-back-ios" size={20} color="#333" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.prevButton}
        onPress={() => navigator.navigate('SignIn')}>
        <Text style={styles.initialPrevText}>로그인 페이지로 이동</Text>
      </TouchableOpacity>
      {/* )} */}
    </View>
  );
};

export default SignUpHeader;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    width: '100%',
  },
  prevButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prevButton: {
    marginVertical: 10,
  },
  prevButtonText: {
    color: 'gray',
    fontSize: 22,
    fontFamily: 'Pretendard-Bold',
    borderBottomWidth: 0.5,
  },
  initialPrevText: {
    color: 'black',
    borderBottomWidth: 1,
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
});
