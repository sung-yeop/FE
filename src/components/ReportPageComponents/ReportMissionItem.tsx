import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {GetCareMissionDataWithId} from '../../data/DefaultDataSet';
import {MissionCareType} from '../../types';
import {theme} from '../../style/Theme';

type Props = {
  missionId: MissionCareType;
  onPress: () => void;
};

const ReportMissionItem = ({missionId, onPress}: Props) => {
  const mission = GetCareMissionDataWithId(missionId);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.mainContainer}>
        <Image
          source={mission?.img}
          resizeMode="contain"
          style={styles.imgStyle}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.titleTextStyle}>{mission?.title}</Text>
          <Text style={styles.desciptionTextStyle}>{mission?.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReportMissionItem;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  imgStyle: {
    width: 36,
    height: 36,
  },
  contentContainer: {
    gap: 4,
  },
  titleTextStyle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: 'black',
  },
  desciptionTextStyle: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    letterSpacing: -0.5,
  },
});
