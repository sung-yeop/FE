import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GetCareMissionDataWithId} from '../../data/DefaultDataSet';
import {MissionCareType} from '../../types';
import {TimeFormatting} from '../../util/TimeFormatting';
import {FireImg} from '../../../asset/images';

type Props = {
  missionId: MissionCareType;
  timer: Date | undefined;
};

const AlarmScreenMissionItem = ({missionId, timer}: Props) => {
  if (!missionId || !timer) return null;
  const mission = GetCareMissionDataWithId(missionId);
  const viewTime = TimeFormatting(timer);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>미션 알람</Text>
      <View style={styles.cardContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {viewTime.ampm} {viewTime.viewTime}
          </Text>
        </View>
        <View style={styles.missionContainer}>
          <Image source={mission?.img} style={styles.missionImg} />
          <Text style={styles.missionTitle}>{mission?.title}</Text>
        </View>
      </View>
      <View style={styles.animationContainer}>
        <Image source={FireImg} style={{width: 250, height: 250}} />
      </View>
    </View>
  );
};

export default AlarmScreenMissionItem;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titleText: {
    fontSize: 32,
    fontFamily: 'Pretendard-Bold',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 24,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  timeContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 36,
    fontFamily: 'Pretendard-Bold',
    color: '#2cc295',
  },
  missionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  missionImg: {
    height: 32,
    width: 32,
  },
  missionTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: '#1A1A1A',
  },
  // 애니메이션 이미지를 위한 컨테이너
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200, // 적절한 높이로 조정
    marginVertical: 24,
  },
});
