import {useContext} from 'react';
import {AlarmContextManage} from '../components/AlarmPageComponents/AlarmContext';

export const useCurrentAlarm = () => {
  const context = useContext(AlarmContextManage);
  if (context === undefined) {
    throw new Error('useAlarm must be used within an AlarmProvider');
  }
  return context;
};
