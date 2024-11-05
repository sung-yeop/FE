import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AddMissionButton from '../AddMissionButton';
import Modal_SelectMission from './Modal_SelectMission';

const ReportSelectMission = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>진행한 미션을 선택해주세요</Text>
      <AddMissionButton onPressButton={() => setIsVisibleModal(true)} />
      <Modal_SelectMission
        isVisible={isVisibleModal}
        onCloseModal={() => setIsVisibleModal(false)}
      />
    </View>
  );
};

export default ReportSelectMission;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
});
