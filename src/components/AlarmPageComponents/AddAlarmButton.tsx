import {Dimensions, Image, Platform, StyleSheet, View} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Modal_CU_Alarm from './Modal_CU_Alarm';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AlarmButtonImg} from '../../../asset/images';

const {height} = Dimensions.get('window');

type Props = {
  children?: ReactNode;
};

const AddAlarmButton = ({children}: Props) => {
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);

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
        }}>
        {children && children}
      </Modal_CU_Alarm>
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
    borderColor: '#BBB', // 연한 회색 테두리
    width: 56,
    height: 56,
    justifyContent: 'center',
    elevation: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
  },
  buttonImgStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
