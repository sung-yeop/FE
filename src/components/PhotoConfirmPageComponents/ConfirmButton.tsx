import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  func: () => void;
  title: string;
};

const ConfirmButton = ({func, title}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={func}>
        {title}
      </Text>
    </View>
  );
};

export default ConfirmButton;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    color: 'black',
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
  },
});
