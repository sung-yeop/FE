import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Alarm} from '../../types';
import Ionic from 'react-native-vector-icons/Ionicons';

type Props = {
  closeModal: () => void;
  alarm?: Alarm;
};

const Modal_CU_Header = ({alarm, closeModal}: Props) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={closeModal} style={styles.closeIconContainer}>
        <Ionic name={'close'} size={28} color={'black'} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          {alarm ? '알람 수정' : '알람 생성'}
        </Text>
      </View>
    </View>
  );
};

export default Modal_CU_Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  closeIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -28,
    paddingVertical: 15,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
