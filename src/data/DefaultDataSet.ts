import {MissionCareType, StepKey} from '../types';
import {
  EatFoodImg,
  ManageBloodSugar,
  EatMedicianImg,
  ManageBloodPressure,
} from '../../asset/images';

export const CareMissionData = [
  {
    id: 'Manage blood sugar' as MissionCareType,
    title: '혈당 관리하기',
    img: ManageBloodPressure,
    description: '기기의 사진을 찍어주세요',
  },
  {
    id: 'Manage blood pressure' as MissionCareType,
    title: '혈압 관리하기',
    img: ManageBloodSugar,
    description: '기기의 사진을 찍어주세요',
  },
  {
    id: 'Eat food' as MissionCareType,
    title: '식사 관리하기',
    img: EatFoodImg,
    description: '음식 사진을 찍어주세요',
  },
  {
    id: 'Eat Medician' as MissionCareType,
    title: '약 복용하기',
    img: EatMedicianImg,
    description: '약 봉투 혹은 약 사진을 찍어주세요',
  },
];
export const GetCareMissionDataWithId = (id: MissionCareType) => {
  const find = CareMissionData.filter(d => d.id === id)[0];

  return find ? find : undefined;
};
