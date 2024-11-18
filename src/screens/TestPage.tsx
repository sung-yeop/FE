import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {newAlarmSend} from '../api/AlarmAPI';
import {validationSend} from '../api/ValidationAPI';
import {getMissionFromReport, reportSend} from '../api/ReportAPI';
import {TestMockData} from '../data/TestMockData';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CustomCameraPage'
>;

const TestPage = () => {
  const navigation = useNavigation<NavigationProp>();
  const handleCreateAlarmTest = async () => {
    const response = await newAlarmSend(TestMockData.alarmWithMission);
    console.log(response);
  };

  const handleSignInTest = async () => {
    const response = await validationSend(TestMockData.alarmWithMission);
    console.log(response);
  };

  const handleReportTest = () => {
    const response = reportSend(TestMockData.reportSend);
    console.log({...response});
  };

  const handleMissionGetTest = () => {
    const response = getMissionFromReport();
    console.log(response);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={handleCreateAlarmTest}
        style={styles.createAlarmContainer}>
        <Text style={styles.textStyle}>알람 생성 테스트</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSignInTest}
        style={styles.createAlarmContainer}>
        <Text style={styles.textStyle}>
          인증 성공 테스트 - 위에서 생성한 알람
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleReportTest}
        style={styles.createAlarmContainer}>
        <Text style={styles.textStyle}>리포트 페이지 POST API 테스트</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleMissionGetTest}
        style={styles.createAlarmContainer}>
        <Text style={styles.textStyle2}>성공한 Mission GET API 테스트</Text>
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
