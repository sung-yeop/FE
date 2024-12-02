import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileSetting = () => {
  const menuItems = [
    {icon: 'person', title: '계정 설정'},
    {icon: 'notifications', title: '알림 설정'},
    {icon: 'lock', title: '개인정보 보호'},
    {icon: 'help', title: '도움말'},
  ];

  return (
    <View style={styles.Container}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.MenuItem,
            index !== menuItems.length - 1 && styles.MenuItemBorder,
          ]}>
          <View style={styles.MenuItemContent}>
            <Icon name={item.icon} size={24} color="#333333" />
            <Text style={styles.MenuItemText}>{item.title}</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#666666" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProfileSetting;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'black',
  },
  MenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  MenuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  MenuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  MenuItemText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#333333',
    marginLeft: 12,
  },
});
