import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoginContent from '../components/LoginPageComponents/LoginContent';
import LoginFunctionContent from '../components/LoginPageComponents/LoginFunctionContent';

const SignInPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <LoginContent />
        <LoginFunctionContent />
      </View>
    </View>
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 40,
  },
  contentContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
  },
});
