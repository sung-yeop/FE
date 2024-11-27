import React from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet} from 'react-native';

const EatingAnimation = () => {
  return (
    <LottieView
      source={require('../Animations/EatingAnimation.json')}
      autoPlay
      loop
      style={{width: 200, height: 200}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EatingAnimation;
