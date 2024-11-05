import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {newAlarmSend} from '../api/AlarmAPI';
import {TestMockData} from '../data/TestMockData';
import {sendSignUpData} from '../api/SignAPI';
import {validationSend} from '../api/ValidationAPI';
import {getMissionFromReport, reportSend} from '../api/ReportAPI';

const TestPage = () => {
  const handleCreateAlarmTest = async () => {
    const response = await newAlarmSend(TestMockData.alarmWithMission);
    console.log(response);
  };
  const handleSignUpTest = async () => {
    const response = await sendSignUpData(TestMockData.signUpInfo);
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
        onPress={handleSignUpTest}
        style={styles.createAlarmContainer}>
        <Text style={styles.textStyle}>회원가입 테스트</Text>
      </TouchableOpacity>
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
