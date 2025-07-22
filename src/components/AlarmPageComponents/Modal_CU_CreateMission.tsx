import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useCurrentAlarm} from '../../hooks/useCurrentAlarm';
import Modal_Mission_CreateMission from './Modal_Mission_CreateMission';
import AddMissionButton from '../AddMissionButton';
import MissionItem from './MissionItem';
import {theme} from '../../style/Theme';

const Modal_CU_CreateMission = () => {
  const {current, updateMission} = useCurrentAlarm();
  const [isVisibleCreateMissionModal, setIsVisibleCreateMissionModal] =
    useState<boolean>(false);

  const onChangeModeSwitch = () => {
    if (current.mission?.mode === 'Strict') {
      return updateMission({mode: 'Free'});
    } else {
      return updateMission({mode: 'Strict'});
    }
  };

  console.log('MISSION : ', current.mission);

  return (
    <View style={styles.Container}>
      <View style={styles.HeaderContainer}>
        <Text style={theme.typography.h3}>미션 추가</Text>
        <View style={styles.HeaderModeSelectContariner}>
          <Text style={theme.typography.body1}>엄격 모드</Text>
          <Switch
            value={current.mission?.mode === 'Strict' ? true : false}
            onChange={onChangeModeSwitch}
          />
        </View>
      </View>
      {current.mission !== undefined && current.mission?.id !== undefined ? (
        <MissionItem
          id={current.mission.id}
          onPress={() => setIsVisibleCreateMissionModal(true)}
        />
      ) : (
        <AddMissionButton
          onPressButton={() => setIsVisibleCreateMissionModal(true)}
        />
      )}
      <Modal_Mission_CreateMission
        onCloseModal={() => setIsVisibleCreateMissionModal(false)}
        isVisible={isVisibleCreateMissionModal}
      />
    </View>
  );
};

export default Modal_CU_CreateMission;

const styles = StyleSheet.create({
  Container: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    gap: 15,
  },
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  HeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  HeaderModeSelectContariner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  HeaderModeText: {
    color: 'black',
  },
  AddMissionContainer: {
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'dashed',
    paddingVertical: 20,
    marginTop: 15,
  },
  AddMissionText: {
    textAlign: 'center',
  },
});
