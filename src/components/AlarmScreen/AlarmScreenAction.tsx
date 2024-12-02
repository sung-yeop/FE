import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useCurrentAlarm} from '../../hooks/useCurrentAlarm';
import {useAlarmManager} from '../../hooks/useAlarmManager';
import {Alarm, MissionCareType} from '../../types';
import {theme} from '../../style/Theme';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {useRecoilValue} from 'recoil';
import {userSelector} from '../../atoms';

type Props = {
  alarmId: string;
};
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CustomCameraPage'
>;

const AlarmScreenAction = ({alarmId}: Props) => {
  const navigate = useNavigation<NavigationProp>();
  const userInfo = useRecoilValue(userSelector);
  const alarmManager = useAlarmManager();
  const {current} = useCurrentAlarm();

  if (!userInfo)
    throw new Error(
      'AlarmScreenAction.tsx | userInfo가 정의되어있지 않습니다.',
    );
  if (!current)
    throw new Error('AlarmScreenAction.tsx | current가 정의되어있지 않습니다.');

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
        <TouchableOpacity
          style={styles.takePictureContainer}
          onPress={() =>
            navigate.navigate('CustomCameraPage', {
              alarmId: alarmId,
              username: userInfo.id,
              missionName: current.mission.id,
            })
          }>
          <Text style={theme.buttonTextStyle}>사진찍기</Text>
        </TouchableOpacity>
        <View>
          {current.setting.alarmInterval !== 0 ? (
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
            {current.setting.alarmInterval !== 0 && (
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
    backgroundColor: 'transparent',
  },
  selectContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  takePictureContainer: {
    backgroundColor: '#2cc295',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  takeLaterContainer: {
    marginTop: 12,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  takeLaterText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    color: '#495057',
  },
  takeLaterDisText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: '#868E96',
    marginTop: 4,
  },
  exitCurrentContentContainer: {
    marginTop: 12,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#4a6ee0',
  },
  exitCurrnetAlarmContainer: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  exitCurrentAlarmDisText: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Pretendard-Medium',
    color: '#868E96',
    marginBottom: 8,
  },
});
