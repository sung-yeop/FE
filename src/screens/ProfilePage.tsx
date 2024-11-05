import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader';
import MyProfile from '../components/ProfilePageComponenets/MyProfile';
import ProfileSetting from '../components/ProfilePageComponenets/ProfileSetting';
import UpdatePrimium from '../components/ProfilePageComponenets/UpdatePrimium';

const ProfilePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MyProfile />
      <ScrollView style={styles.content}>
        <View style={styles.ViewContent}>
          <UpdatePrimium />
          <ProfileSetting />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  content: {
    flex: 1,
  },
  ViewContent: {
    flex: 1,
    gap: 5,
  },
});
