import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LoginGNB = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>로그인</Text>
    </View>
  );
};

export default LoginGNB;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 30,
    marginTop: 20,
  },
  text: {
    fontFamily: 'Pretendard-Bold',
    color: 'black',
    fontSize: 22,
  },
});
