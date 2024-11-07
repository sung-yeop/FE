import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PageHeader = ({text, img}: {text: string; img: any}) => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.textContainer}>
        <Image source={img} style={styles.imgStyle} />
        <Text style={styles.title}>{text}</Text>
      </View>
    </View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#dee2e6',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Pretendard-ExtraBold',
    color: 'black',
  },
  imgStyle: {
    width: 20,
    height: 20,
  },
  textContainer: {
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
