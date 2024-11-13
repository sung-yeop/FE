import {Dimensions, Image, Platform, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Modal_CU_Alarm from './Modal_CU_Alarm';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AlarmButtonImg} from '../../../asset/images';

const {height} = Dimensions.get('window');

const AddAlarmButton = () => {
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={Platform.select({
          android: styles.AndroidButtonContainer,
          ios: styles.IOSButtonContainer,
        })}
        onPress={() => setIsVisibleModal(true)}>
        <View style={styles.buttonStyle}>
          <Image
            source={AlarmButtonImg}
            style={styles.buttonStyle}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      <Modal_CU_Alarm
        isVisibleModal={isVisibleModal}
        closeModal={() => {
          setIsVisibleModal(false);
        }}
      />
    </SafeAreaView>
  );
};

export default AddAlarmButton;

const styles = StyleSheet.create({
  AndroidButtonContainer: {
    position: 'absolute',
    bottom: height * 0.015,
    alignSelf: 'center',
    zIndex: 10,
    elevation: 5,
  },
  IOSButtonContainer: {
    position: 'absolute',
    bottom: height * 0.015,
    alignSelf: 'center',
    zIndex: 10,
  },
  buttonStyle: {
    backgroundColor: 'white', // 흰색 배경 추가
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E8E8E8', // 연한 회색 테두리
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    // iOS 그림자
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    // 내부 여백
    padding: 12,
  },
  buttonImgStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
