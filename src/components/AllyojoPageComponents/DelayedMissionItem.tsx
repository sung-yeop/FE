import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Alarm} from '../../types';
import {GetCareMissionDataWithId} from '../../data/DefaultDataSet';
import CustomCamera from '../../screens/CustomCameraPage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

type Props = {
  delayedAlarm: Alarm;
};

type RootStackParamList = {
  CustomCameraPage: {
    alarmId: string;
    username: string;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const DelayedMissionItem = ({delayedAlarm}: Props) => {
  const hour = delayedAlarm?.timer.getHours();
  const viewHour = hour >= 12 ? hour - 12 : hour;
  const minute = delayedAlarm?.timer.getMinutes();
  const ampm = hour >= 12 ? '오후' : '오전';
  const viewTime = `${String(viewHour).padStart(2, '0')}:${String(
    minute,
  ).padStart(2, '0')}`;
  const mission = GetCareMissionDataWithId(delayedAlarm.mission.id);
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View>
          <View style={styles.headerContainer}>
            <View style={styles.timeOutContainer}>
              <View style={styles.timeContainer}>
                <Text style={styles.ampmText}>{ampm}</Text>
                <Text style={styles.timeText}>{viewTime}</Text>
              </View>
            </View>
          </View>
          <View style={styles.missionContainer}>
            <Image
              source={mission?.img}
              resizeMode="contain"
              style={styles.missionImg}
            />
            <View>
              <Text style={styles.missionText}>{mission?.title}</Text>
              <Text style={styles.missionDescipt}>{mission?.description}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CustomCameraPage', {
                alarmId: delayedAlarm.alarmid,
                username: 'asf',
              })
            }>
            <Text style={styles.takePictureText}>인증 하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DelayedMissionItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 22,
    paddingVertical: 14,
    marginVertical: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeOutContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 4,
    backgroundColor: '#929292',
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'baseline',
  },
  ampmText: {
    fontFamily: 'Pretendard-Bold',
    color: 'white',
    fontSize: 18,
  },
  timeText: {
    letterSpacing: -1,
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
    color: 'white',
  },
  delayText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: '#ff6b6b', // 지연 상태를 나타내는 빨간색
  },
  missionContainer: {
    paddingTop: 12,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  missionText: {
    letterSpacing: -1,
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    color: 'black',
  },
  missionImg: {
    width: 40,
    height: 40,
  },
  missionDescipt: {
    fontFamily: 'Pretendard-Regular',
  },
  contentContainer: {
    flexDirection: 'row',
    gap: 48,
  },
  rightContainer: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 0.3,
    borderColor: 'gray',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  takePictureText: {
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
    color: 'white',
    fontSize: 16,
  },
});
