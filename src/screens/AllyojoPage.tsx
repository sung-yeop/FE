import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AddTodoButton from '../components/AllyojoPageComponents/AddTodoButton';
import MissionListEveryDay from '../components/AllyojoPageComponents/MissionListEveryDay';
import MissionList from '../components/AllyojoPageComponents/MissionList';
import DelayedMissionList from '../components/AllyojoPageComponents/DelayedMissionList';
import {useState} from 'react';
import {AlarmImg} from '../../asset/images';
import HeaderSelector from '../components/AllyojoPageComponents/HeaderSelector';
import AllyojoHeader from '../components/AllyojoPageComponents/AllyojoHeader';
import TodoList from '../components/AllyojoPageComponents/TodoList';

const AllyojoPage = () => {
  const [pageNav, setPageNav] = useState<'Todo' | 'Mission' | 'Delay'>('Todo');
  const handleComp = (pageNav: 'Todo' | 'Mission' | 'Delay') => {
    setPageNav(pageNav);
  };
  return (
    <SafeAreaView style={styles.container}>
      <AllyojoHeader />
      <HeaderSelector handleComp={handleComp} select={pageNav} />
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.scrollViewContent}>
        {pageNav === 'Todo' ? (
          <TodoList />
        ) : pageNav === 'Mission' ? (
          <View>
            <MissionListEveryDay />
            <MissionList />
          </View>
        ) : (
          <DelayedMissionList />
        )}
      </ScrollView>
      {pageNav === 'Todo' && <AddTodoButton />}
    </SafeAreaView>
  );
};

export default AllyojoPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 16,
    paddingTop: 12,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  defaultContainer: {
    flex: 1,
  },
});
