import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {theme} from '../../../../style/Theme';
import {GuardianAPI} from '../../../../api/GuardianAPI';
import {useCurrentAlarm} from '../../../../hooks/useCurrentAlarm';
import {useGuardianManager} from '../../../../hooks/useGuardianManager';

type Props = {
  id?: string;
  closeModal: () => void;
};

const SaveAlarmGuardianButton = ({id, closeModal}: Props) => {
  const {current} = useCurrentAlarm();
  const guardianManager = useGuardianManager();
  const onClickSaveButton = () => {
    if (current.username === undefined) {
      Alert.alert('확인', '대상을 선택해주셔야 합니다'),
        [
          {
            text: '확인',
            styles: 'cancel',
          },
        ];
      return null;
    }
    if (
      current.mission.mode === 'Strict' &&
      current.setting.alarmInterval === 0
    ) {
      Alert.alert(
        '주의',
        '엄격 모드를 사용할 경우, 알람 반복 간격을 선택해야 합니다.',
        [
          {
            text: '확인',
            style: 'cancel',
          },
        ],
      );
      return null;
    }
    if (current.mission.id === undefined) {
      Alert.alert('확인', '미션을 선택해주셔야 합니다'),
        [
          {
            text: '확인',
            styles: 'cancel',
          },
        ];
      return null;
    }

    GuardianAPI.addAlarm({alarm: current});
    const updatedAlarm = {...current, active: true};

    if (id) {
      console.log('SaveAlarmGuardianButton / 알람 아이디 있음');
      guardianManager.updateGuardianAlarm(updatedAlarm);
    } else {
      console.log('SaveAlarmGuardianButton / 알람 아이디 없음');
      guardianManager.saveGuardianAlarm(updatedAlarm);
    }
    closeModal();
  };

  return (
    <TouchableOpacity
      style={theme.buttonContainerStyle}
      onPress={onClickSaveButton}>
      <Text style={theme.buttonTextStyle}>저장하기</Text>
    </TouchableOpacity>
  );
};

export default SaveAlarmGuardianButton;
