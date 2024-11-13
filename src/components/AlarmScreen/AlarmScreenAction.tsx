import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useCurrentAlarm} from '../../hooks/useCurrentAlarm';
import {useAlarmManager} from '../../hooks/useAlarmManager';
import {Alarm} from '../../types';
import {theme} from '../../style/Theme';

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
          <Text style={theme.buttonTextStyle}>사진찍기</Text>
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
              <Text style={theme.buttonTextStyle}>알람 종료</Text>
              <Text style={[styles.takeLaterDisText, {color: 'white'}]}>
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
              <Text style={theme.buttonTextStyle}>알람 종료</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.05)', // 배경에 약간의 오버레이
  },
  selectContainer: {
    justifyContent: 'center',
    paddingVertical: 24,
    paddingBottom: 40, // 하단 여백 증가
    gap: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  takePictureContainer: {
    padding: 16,
    backgroundColor: '#2cc295',
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  takePictureText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: -0.5,
  },
  takeLaterContainer: {
    padding: 16,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  takeLaterText: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
    letterSpacing: -0.5,
  },
  exitCurrnetAlarmContainer: {
    justifyContent: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.08)',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exitCurrentAlarmDisText: {
    textAlign: 'center',
    paddingVertical: 8,
    color: '#666',
    fontSize: 15,
  },
  exitCurrentContentContainer: {
    padding: 16,
    backgroundColor: '#4a6ee0', // 더 부드러운 블루
    marginHorizontal: 20,
    borderRadius: 12,
  },
  exitCurrentContentTitleText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  takeLaterDisText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Pretendard-SemiBold',
    opacity: 0.9,
    marginTop: 4,
  },
});
