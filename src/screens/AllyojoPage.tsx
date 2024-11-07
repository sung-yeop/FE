import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DelayedMissionList from '../components/AllyojoPageComponents/DelayedMissionList';
import PageHeader from '../components/PageHeader';
import AddTodoButton from '../components/AllyojoPageComponents/AddTodoButton';
import TodoListEveryDay from '../components/AllyojoPageComponents/TodoListEveryDay';
import TodoList from '../components/AllyojoPageComponents/TodoList';
import {AlarmImg} from '../../asset/images';

const AllyojoPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader text={'알려줘'} img={AlarmImg} />
      <ScrollView style={styles.contentContainer}>
        <DelayedMissionList />
        <TodoListEveryDay />
        <TodoList />
      </ScrollView>
      <AddTodoButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginHorizontal: 15,
  },
});

export default AllyojoPage;
