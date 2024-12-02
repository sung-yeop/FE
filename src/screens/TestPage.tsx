import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {VerificationAPI} from '../api/VerificationAPI';
import {MissionCareType} from '../types';
import CustomSwipeable from '../util/CustomSwipeable';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CustomCameraPage',
  'AlarmScreen'
>;

const TestPage = () => {
  const navigation = useNavigation<NavigationProp>();

  const addVerificationMockData = async () => {
    await VerificationAPI.sendFirstAlert('87774435');
    await VerificationAPI.sendAlertWithBP('87774435', 30, 50);
    await VerificationAPI.sendFirstAlert('158943204');
    await VerificationAPI.sendAlertWithBP('158943204', 100, 120);
    await VerificationAPI.sendFirstAlert('547987392');
    await VerificationAPI.sendAlertWithBP('547987392', 80, 90);
    // await VerificationAPI.sendAlert('1447805143', 50, true);
    // await VerificationAPI.sendAlertWithFood('1990791846', [
    //   {
    //     foodName: '김치찌개',
    //     carbohydrates: 10,
    //     protein: 10,
    //     fat: 10,
    //     sodium: 10,
    //   },
    //   {
    //     foodName: '된장찌개',
    //     carbohydrates: 20,
    //     protein: 12,
    //     fat: 15,
    //     sodium: 20,
    //   },
    // ]);
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
            missionName: 'Eat food' as MissionCareType,
          })
        }
        style={styles.createAlarmContainer}>
        <Text style={styles.textStyle2}>카메라 페이지로 이동</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Success', {
            missionName: 'Eat food' as MissionCareType,
          })
        }
        style={styles.createAlarmContainer}>
        <Text style={styles.textStyle2}>성공 페이지 이동</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Fail', {
            missionName: 'Eat food' as MissionCareType,
          })
        }
        style={styles.createAlarmContainer}>
        <Text style={styles.textStyle2}>실패 페이지 이동</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AlarmScreen', {
            alarmId: '478933382',
          })
        }
        style={styles.createAlarmContainer}>
        <Text style={styles.textStyle2}>알람 Alert 페이지로 이동</Text>
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
  rightAction: {width: 50, height: 50, backgroundColor: 'purple'},
  separator: {
    width: '100%',
    borderTopWidth: 1,
  },
  swipeable: {
    height: 50,
    backgroundColor: 'papayawhip',
    alignItems: 'center',
  },
});
