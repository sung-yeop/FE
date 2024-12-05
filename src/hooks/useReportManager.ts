import {useRecoilState} from 'recoil';
import {currentReportSelector} from '../atoms';
import {MissionCareType, Report, ReportDuration} from '../types';

export const useReportManager = () => {
  const [current, setCurrent] = useRecoilState(currentReportSelector);

  const updateCurrent = (data: Partial<Report>) => {
    setCurrent({...current, ...data});
  };

  const updateCurrentDuration = (duration: ReportDuration) => {
    updateCurrent({duration: duration});
  };

  const updateCurrentMission = (mission: MissionCareType) => {
    updateCurrent({mission: mission});
  };

  return {
    current,
    updateCurrentDuration,
    updateCurrentMission,
  };
};
