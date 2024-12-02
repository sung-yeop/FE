import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {height} = Dimensions.get('window');

type Props = {
  name: string;
  id: string;
};

const MyProfile = ({name, id}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <View style={styles.leftSection}>
          <View style={styles.avatarContainer}>
            <Icon name="person" size={32} color="#FFF" />
          </View>
          <View style={styles.userNameContainer}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.emailText}>{id}</Text>
          </View>
        </View>
        <View style={styles.premiumContainer}>
          <Icon name="star" size={24} color="#0066CC" />
          <Text style={styles.premiumText}>프리미엄</Text>
          <Text style={styles.validityText}>2024.12.31까지</Text>
        </View>
      </View>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A237E',
    marginVertical: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  userNameContainer: {
    justifyContent: 'center',
    gap: 4,
  },
  nameText: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Pretendard-Bold',
  },
  emailText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Pretendard-Medium',
  },
  premiumContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    minWidth: 120,
  },
  premiumText: {
    color: '#0066CC',
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
  validityText: {
    color: '#666666',
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
  },
});
