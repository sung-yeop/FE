import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {useNavigation} from '@react-navigation/native';
import {StepKey} from '../../types';

type Props = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

type AlarmScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

const SignUpHeader = ({step, setStep}: Props) => {
  const navigator = useNavigation<AlarmScreenNavigationProp>();

  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  return (
    <View style={styles.prevButtonContainer}>
      {step > 1 ? (
        <TouchableOpacity style={styles.prevButton} onPress={prevStep}>
          <Text style={styles.prevButtonText}>{'<'}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.prevButton}
          onPress={() => navigator.navigate('SignIn')}>
          <Text style={styles.initialPrevText}>로그인 페이지로 이동</Text>
        </TouchableOpacity>
      )}
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
    justifyContent: 'flex-start',
  },
  prevButton: {
    marginVertical: 10,
    padding: 10,
  },
  prevButtonText: {
    color: 'black',
    fontSize: 28,
  },
  initialPrevText: {
    color: 'black',
    borderBottomWidth: 1,
    fontSize: 16,
  },
});
