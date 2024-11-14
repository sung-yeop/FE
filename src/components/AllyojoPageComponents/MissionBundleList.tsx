import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import MissionSelector from './MissionSelector';
import MissionListEveryDay from './MissionListEveryDay';
import MissionList from './MissionList';

const MissionBundleList = () => {
  const [missionSelect, setMissionSelect] = useState<'Every' | 'Week'>('Every');
  return (
    <View>
      <MissionSelector
        missionSelect={missionSelect}
        setMissionSelect={setMissionSelect}
      />
      {missionSelect === 'Every' ? <MissionListEveryDay /> : <MissionList />}
    </View>
  );
};

export default MissionBundleList;

const styles = StyleSheet.create({});
