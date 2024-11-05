import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const {height} = Dimensions.get('window');

const ProfileSetting = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.ContentContainer}>
        <Text>이미지</Text>
        <Text>보호자 연락처 관리</Text>
      </View>
    </View>
  );
};

export default ProfileSetting;

const styles = StyleSheet.create({
  Container: {
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  ContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
