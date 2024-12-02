import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader';
import {ScrollView, StyleSheet} from 'react-native';
import AddTodoButton from '../components/AllyojoPageComponents/AddTodoButton';
import DelayedMissionList from '../components/AllyojoPageComponents/DelayedMissionList';
import {useState} from 'react';
import {AlarmImg} from '../../asset/images';
import HeaderSelector from '../components/AllyojoPageComponents/HeaderSelector';
import TodoList from '../components/AllyojoPageComponents/TodoList';
import MissionBundleList from '../components/AllyojoPageComponents/MissionBundleList';

const AllyojoPage = () => {
  const [pageNav, setPageNav] = useState<'Todo' | 'Mission' | 'Delay'>('Todo');
  const handleComp = (pageNav: 'Todo' | 'Mission' | 'Delay') => {
    setPageNav(pageNav);
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <AllyojoHeader /> */}
      <PageHeader text={'모아보기'} img={AlarmImg} />
      <HeaderSelector handleComp={handleComp} select={pageNav} />
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.scrollViewContent}>
        {pageNav === 'Todo' ? (
          <TodoList />
        ) : pageNav === 'Mission' ? (
          <MissionBundleList />
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
