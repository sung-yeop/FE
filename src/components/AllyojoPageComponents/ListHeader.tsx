import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {ReactNode, useRef, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

type Props = {
  title: string;
  children: ReactNode;
  toggleExpand: () => void;
  isExpanded: boolean;
};

const ListHeader = ({title, children, toggleExpand, isExpanded}: Props) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} style={styles.headerContainer}>
        <Text style={styles.headerText}>{title}</Text>
        <Entypo name={isExpanded ? 'chevron-up' : 'chevron-down'} size={24} />
      </TouchableOpacity>
      {children}
    </ScrollView>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    overflow: 'hidden',
  },
  headerContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});
