import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UpdatePrimium = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon name="stars" size={24} color="#FFD700" />
        </View>
        <Text style={styles.title}>Upgrade Premium</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdatePrimium;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFAF0', // 연한 크림색 배경
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FFE4B5', // 연한 골드 테두리
  },
  content: {
    alignItems: 'center',
    gap: 12,
    flexDirection: 'row',
  },
  iconContainer: {
    backgroundColor: '#FFF3E0', // 연한 주황색 배경
    padding: 12,
    borderRadius: 50,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    color: '#B8860B', // 진한 골드 색상
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#996515', // 갈색빛 골드
    lineHeight: 22,
    textAlign: 'center',
  },
});
