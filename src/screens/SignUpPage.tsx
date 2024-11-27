import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SignUpHeader from '../components/SignUpPageComponents/SignUpHeader';
import SignUpContext from '../components/SignUpPageComponents/SignUpContext';
import RenderSteps from '../components/SignUpPageComponents/RenderSteps/RenderSteps';

const SignUpPage = () => {
  return (
    <View style={styles.container}>
      <SignUpContext>
        <SignUpHeader />
        <RenderSteps />
      </SignUpContext>
    </View>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 30,
    gap: 16,
  },
});
