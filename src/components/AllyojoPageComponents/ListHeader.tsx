import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

type Props = {
  title: string;
  powerTitle?: string;
};

const ListHeader = ({powerTitle, title}: Props) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.headerContainer}>
        <View style={styles.textContainer}>
          {powerTitle && (
            <Text style={styles.headerPowerText}>{powerTitle}</Text>
          )}
          <Text style={styles.headerText}>{title}</Text>
        </View>
      </TouchableOpacity>
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  headerText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  headerPowerText: {
    fontSize: 20,
    color: '#C93939',
    fontWeight: 'bold',
    marginRight: 4,
  },
});
