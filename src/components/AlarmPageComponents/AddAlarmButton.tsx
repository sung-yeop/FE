import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal_CU_Alarm from './Modal_CU_Alarm';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

const AddAlarmButton = () => {
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
          <Entypo name={'plus'} size={30} color={'white'} />
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
    flex: 1,
    position: 'absolute',
    bottom: height * 0.01,
    right: width * 0.01,
    zIndex: 10,
  },
  IOSButtonContainer: {
    flex: 1,
    position: 'absolute',
    bottom: height * 0.01,
    right: width * 0.01,
    zIndex: 10,
  },
  buttonStyle: {
    backgroundColor: 'black',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
