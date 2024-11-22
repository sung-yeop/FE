import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {newAlarmSend} from '../api/AlarmAPI';
import {validationSend} from '../api/ValidationAPI';
import {TestMockData} from '../data/TestMockData';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {VerificationAPI} from '../api/VerificationAPI';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CustomCameraPage',
  'AlarmScreen'
>;

const TestPage = () => {
  const navigation = useNavigation<NavigationProp>();

  const addVerificationMockData = async () => {
    // await VerificationAPI.sendFirstAlert('1264745454');
    // await VerificationAPI.sendAlert('1264745454', 100, true);
    // await VerificationAPI.sendFirstAlert('3698427497');
    // await VerificationAPI.sendAlert('3698427497', 90, true);
    // await VerificationAPI.sendFirstAlert('7723384149');
    // await VerificationAPI.sendAlert('7723384149', 80, true);
    await VerificationAPI.sendFirstAlert('5317533144');
    await VerificationAPI.sendAlert('5317533144', 80, true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={addVerificationMockData}>
        <Text>Verification Mock Data Input</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CustomCameraPage', {
            alarmId: '111',
            username: '111',
          })
        }
        style={styles.createAlarmContainer}>
        <Text style={styles.textStyle2}>카메라 페이지로 이동</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TestPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  createAlarmContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 50,
    borderWidth: 1,
    marginVertical: 5,
  },

  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },

  textStyle2: {
    color: '#C93939',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
