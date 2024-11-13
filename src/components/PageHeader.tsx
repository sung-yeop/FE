import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PageHeader = ({
  text,
  img,
  children,
}: {
  text: string;
  img: any;
  children?: React.ReactNode;
}) => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Image source={img} style={styles.imgStyle} />
          <Text style={styles.title}>{text}</Text>
        </View>
        {children && <View>{children}</View>}
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
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
