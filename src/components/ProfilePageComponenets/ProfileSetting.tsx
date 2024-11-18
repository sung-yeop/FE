import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GAddUser from './GAddUser/GAddUser';

const ProfileSetting = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.ContentContainer}>
        <Text>이미지</Text>
        <GAddUser />
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
