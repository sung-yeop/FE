import {useRecoilSnapshot, useRecoilState} from 'recoil';
import {currentGuardianReportSelector} from '../atoms';
import {MissionCareType, Report, ReportDuration} from '../types';

type GuardianReport = Report & {username: string};

export const useGuardianReportManager = () => {
  const [current, setCurrent] = useRecoilState(currentGuardianReportSelector);

  const updateCurrent = (data: Partial<GuardianReport>) => {
    setCurrent({...current, ...data});
  };

  const updateCurrentDuration = (duration: ReportDuration) => {
    updateCurrent({duration: duration});
  };

  const updateCurrentMission = (mission: MissionCareType) => {
    updateCurrent({mission: mission});
  };

  const updateCurrnetUsername = (username: string) => {
    updateCurrent({username: username});
  };

  return {
    current,
    updateCurrentDuration,
    updateCurrentMission,
    updateCurrnetUsername,
  };
};
