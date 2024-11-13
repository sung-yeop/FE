import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {useCurrentAlarm} from '../../hooks/useCurrentAlarm';
import {useAlarmManager} from '../../hooks/useAlarmManager';
import {theme} from '../../style/Theme';

type Props = {
  id?: string;
  closeModal: () => void;
};

const SaveAlarmButton = ({id, closeModal}: Props) => {
  const {current, updateAlarm} = useCurrentAlarm();
  const alarmManager = useAlarmManager();
  const onClickSaveButton = () => {
    if (
      current.mission.mode === 'Strict' &&
      current.setting.alarmInterval === '반복 없음'
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

    if (id) {
      alarmManager.updateAlarm({
        alarm: {...current, active: true, delayTimes: 0},
      });
    } else {
      const updatedAlarm = {...current, active: true};
      alarmManager.saveAlarm(updatedAlarm);
      updateAlarm(updatedAlarm);
    }
    closeModal();
  };
  return (
    <View style={theme.buttonContainerStyle}>
      <Text style={theme.buttonTextStyle} onPress={onClickSaveButton}>
        저장하기
      </Text>
    </View>
  );
};

export default SaveAlarmButton;
