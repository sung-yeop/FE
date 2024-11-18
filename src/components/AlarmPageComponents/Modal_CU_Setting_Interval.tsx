import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SettingTimeInterval} from '../../types';
import CheckBox from '@react-native-community/checkbox';
import {theme} from '../../style/Theme';

type Props = {
  isVisibleSettingIntervalModal: boolean;
  onCloseModal: () => void;
  currentInterval: SettingTimeInterval;
  setAlarmInterval: React.Dispatch<React.SetStateAction<SettingTimeInterval>>;
  updateSettings: (
    newSettings: Partial<{
      isVibration: boolean;
      volume: number;
      alarmInterval: SettingTimeInterval;
    }>,
  ) => void;
};

const Modal_CU_Setting_Interval = ({
  isVisibleSettingIntervalModal,
  onCloseModal,
  setAlarmInterval,
  currentInterval,
  updateSettings,
}: Props) => {
  const intervals: SettingTimeInterval[] = [0, 1, 10, 15, 30];
  const onClickSaveButton = () => {
    updateSettings({alarmInterval: currentInterval});
    onCloseModal();
  };

  return (
    <Modal
      visible={isVisibleSettingIntervalModal}
      onRequestClose={onCloseModal}
      animationType="fade"
      transparent={true}>
      <SafeAreaProvider>
        <TouchableWithoutFeedback onPress={onCloseModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
              <View style={styles.modalContainer}>
                <View style={styles.HeaderContainer}>
                  <Text style={theme.typography.h2}>반복 간격 선택</Text>
                </View>
                <View style={styles.ContentContainer}>
                  {intervals.map(interval => {
                    return (
                      <View key={interval} style={styles.Content}>
                        <CheckBox
                          disabled={false}
                          value={currentInterval === interval}
                          onValueChange={() => setAlarmInterval(interval)}
                          animationDuration={0.1}
                          boxType={'circle'}
                        />
                        <Text style={styles.ContentText}>
                          {interval === 0 ? '반복 없음' : `${interval} 분`}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <View style={theme.buttonContainerStyle}>
                  <Text
                    style={theme.buttonTextStyle}
                    onPress={onClickSaveButton}>
                    저장하기
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaProvider>
    </Modal>
  );
};

export default Modal_CU_Setting_Interval;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 0.5,
    padding: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  ContentContainer: {
    flexDirection: 'column',
    gap: 10,
    paddingVertical: 10,
  },
  Content: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  ContentText: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
});
