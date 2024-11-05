import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useCurrentAlarm} from '../../hooks/useCurrentAlarm';
import {useAlarmManager} from '../../hooks/useAlarmManager';
import {Alarm} from '../../types';

const AlarmScreenAction = () => {
  const navigate = useNavigation();
  const alarmManager = useAlarmManager();
  const {current} = useCurrentAlarm();

  const onClickDelayMission = () => {
    const updated = {...current, ['delay']: true} as Alarm;
    alarmManager.updateAlarm({
      alarm: {...updated, delayTimes: updated.delayTimes + 1},
      repeatTrigger: true,
    });
    navigate.goBack();
  };

  const onClickExitMission = () => {
    const updated = {...current, ['delay']: true} as Alarm;
    alarmManager.updateAlarm({alarm: {...updated, active: false}});
    navigate.goBack();
  };
  return (
    <View style={styles.contentContainer}>
      <View style={styles.selectContainer}>
        <View style={styles.takePictureContainer}>
          <Text style={styles.takePictureText}>사진찍기</Text>
        </View>
        <View>
          {current.setting.alarmInterval !== '반복 없음' ? (
            <TouchableOpacity
              style={styles.takeLaterContainer}
              onPress={onClickDelayMission}>
              <Text style={styles.takeLaterText}>나중에 인증하기</Text>
              <Text
                style={
                  styles.takeLaterDisText
                }>{`(${current.setting.alarmInterval}분 안에 인증)`}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.exitCurrentContentContainer}
              onPress={onClickExitMission}>
              <Text style={styles.exitCurrentContentTitleText}>알람 종료</Text>
              <Text style={styles.takeLaterDisText}>
                (오늘까지 미션을 진행해주세요)
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {current.delayTimes > 1 && (
          <View style={styles.exitCurrnetAlarmContainer}>
            {current.setting.alarmInterval !== '반복 없음' && (
              <Text style={styles.exitCurrentAlarmDisText}>
                인증이 어려운 상황인가요?
              </Text>
            )}
            <TouchableOpacity
              style={styles.exitCurrentContentContainer}
              onPress={onClickExitMission}>
              <Text style={styles.exitCurrentContentTitleText}>알람 종료</Text>
              {current.delayTimes && (
                <Text style={styles.takeLaterDisText}>
                  (오늘까지 미션을 진행해주세요)
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default AlarmScreenAction;

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  selectContainer: {
    justifyContent: 'center',
    paddingVertical: 30,
    gap: 10,
  },
  takePictureContainer: {
    padding: 15,
    backgroundColor: 'black',
    marginHorizontal: 40,
    borderRadius: 10,
  },
  takePictureText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  takeLaterContainer: {
    padding: 15,
    backgroundColor: '#C93939',
    marginHorizontal: 40,
    borderRadius: 10,
  },
  takeLaterText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  exitCurrnetAlarmContainer: {
    justifyContent: 'center',
  },
  exitCurrentAlarmDisText: {
    textAlign: 'center',
    paddingVertical: 5,
  },
  exitCurrentContentContainer: {
    padding: 15,
    textAlign: 'center',
    backgroundColor: '#668ADF',
    marginHorizontal: 40,
    borderRadius: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  exitCurrentContentTitleText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  takeLaterDisText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
