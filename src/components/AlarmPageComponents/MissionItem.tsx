import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useCurrentAlarm} from '../../hooks/useCurrentAlarm';
import {GetCareMissionDataWithId} from '../../data/DefaultDataSet';
import {MissionCareType} from '../../types';

type Props = {
  id: MissionCareType;
  onPress?: () => void;
  select?: boolean;
};

const MissionItem = ({id, onPress, select}: Props) => {
  const {updateMission} = useCurrentAlarm();
  const mission = GetCareMissionDataWithId(id);

  if (!mission) {
    return null;
  }

  const onPressButton = () => {
    updateMission({id: id});
    onPress && onPress();
  };

  return (
    <TouchableOpacity
      style={[styles.container, select && styles.selectContainer]}
      onPress={onPressButton}>
      <View style={styles.itemContainer}>
        <View style={styles.titleContainer}>
          <Image source={mission.img} style={styles.imgStyle} />
          <Text style={[styles.titleText, select && styles.selectedTitleText]}>
            {mission.title}
          </Text>
        </View>
        <Text
          style={[
            styles.descriptionText,
            select && styles.selectedDescriptionText,
          ]}>
          {mission.description}
        </Text>
      </View>
      {select ? (
        <View style={styles.selectedIconContainer}>
          <Text style={styles.selectedIconText}>-</Text>
        </View>
      ) : (
        <Text style={styles.plusIcon}>+</Text>
      )}
    </TouchableOpacity>
  );
};

export default MissionItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectContainer: {
    borderColor: '#007AFF',
    borderWidth: 2,
    backgroundColor: '#F0F8FF',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    transform: [{scale: 1.02}],
  },
  itemContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  imgStyle: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedTitleText: {
    color: '#007AFF',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
  },
  selectedDescriptionText: {
    color: '#333',
  },
  plusIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginLeft: 10,
  },
  selectedIconContainer: {
    backgroundColor: '#007AFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIconText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
