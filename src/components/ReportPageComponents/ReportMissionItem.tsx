import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {GetCareMissionDataWithId} from '../../data/DefaultDataSet';
import {MissionCareType} from '../../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  missionId: MissionCareType;
  onPress: () => void;
  isSelected?: boolean;
};

const ReportMissionItem = ({missionId, onPress, isSelected}: Props) => {
  const mission = GetCareMissionDataWithId(missionId);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.mainContainer, isSelected && styles.selectedContainer]}>
      <Image
        source={mission?.img}
        resizeMode="contain"
        style={styles.imgStyle}
      />
      <View style={styles.contentContainer}>
        <Text
          style={[styles.titleTextStyle, isSelected && styles.selectedText]}>
          {mission?.title}
        </Text>
        <Text style={styles.desciptionTextStyle}>{mission?.description}</Text>
      </View>
      {isSelected && (
        <Icon
          name="check-circle"
          size={24}
          color="#2196F3"
          style={styles.checkIcon}
        />
      )}
    </TouchableOpacity>
  );
};

export default ReportMissionItem;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 20,
  },
  selectedContainer: {
    borderColor: '#2196F3',
    backgroundColor: '#f8fbff',
  },
  selectedText: {
    color: '#2196F3',
  },
  checkIcon: {
    position: 'absolute',
    right: 20,
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
  itemContainer: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 12,
    padding: 16,
  },
  selectedItem: {
    borderColor: '#2196F3',
    backgroundColor: '#f1f8ff',
  },
});
