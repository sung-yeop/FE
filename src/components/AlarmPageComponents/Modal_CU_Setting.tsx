import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Switch, TouchableOpacity} from 'react-native';
import {useCurrentAlarm} from '../../hooks/useCurrentAlarm.ts';
import Slider from '@react-native-community/slider';
import {SettingTimeInterval} from '../../types';
import Modal_CU_Setting_Interval from './Modal_CU_Setting_Interval';
import {theme} from '../../style/Theme.ts';

const Modal_CU_Setting = () => {
  const {current, updateAlarm} = useCurrentAlarm();
  const [isVibration, setIsVibration] = useState(false);
  const [volume, setVolume] = useState(50);
  const [alarmInterval, setAlarmInterval] = useState<SettingTimeInterval>(0);
  const [isVisibleSettingIntervalModal, setIsVisibleSettingIntervalModal] =
    useState<boolean>(false);

  const updateSettings = useCallback(
    (
      newSettings: Partial<{
        isVibration: boolean;
        volume: number;
        alarmInterval: SettingTimeInterval;
      }>,
    ) => {
      const updatedSettings = {
        ...current.setting,
        ...newSettings,
      };
      updateAlarm({setting: updatedSettings});
    },
    [current],
  );

  return (
    <View style={styles.container}>
      <Text style={theme.typography.h3}>알람 설정</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>진동</Text>
        <Switch
          value={current.setting.isVibration || isVibration}
          onValueChange={value => {
            setIsVibration(value);
            updateSettings({isVibration: value});
          }}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>알람 볼륨</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={current.setting.volume || volume}
            onValueChange={value => {
              setVolume(value);
              updateSettings({volume: value});
            }}
          />
          <Text style={styles.volumeText}>
            {current.setting.volume.toFixed(0)}
          </Text>
        </View>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>반복 간격</Text>
        <TouchableOpacity
          onPress={() => setIsVisibleSettingIntervalModal(true)}>
          <Text>
            {current.setting.alarmInterval === 0
              ? '반복 없음'
              : `${current.setting.alarmInterval}분`}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal_CU_Setting_Interval
        currentInterval={alarmInterval}
        isVisibleSettingIntervalModal={isVisibleSettingIntervalModal}
        onCloseModal={() => setIsVisibleSettingIntervalModal(false)}
        setAlarmInterval={setAlarmInterval}
        updateSettings={updateSettings}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: 'black',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  slider: {
    flex: 1,
  },
  volumeText: {
    marginLeft: 10,
    width: 30,
    textAlign: 'right',
  },
});

export default Modal_CU_Setting;
