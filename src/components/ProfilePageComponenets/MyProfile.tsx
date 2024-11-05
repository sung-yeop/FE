import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const {height} = Dimensions.get('window');

const MyProfile = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.UserNameContainer}>
        <Text>사용자 이름</Text>
      </View>
      <View style={styles.UserNameContainer}>
        <Text>프리미엄 여부</Text>
      </View>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    height: height * 0.15,
    justifyContent: 'space-between',
  },
  UserNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
