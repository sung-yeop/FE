import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilValue} from 'recoil';
import {guardianSelector, userSelector} from '../atoms';
import {useEffect, useState} from 'react';
import {UserInfo} from '../types';

export const useUserInfoManager = () => {
  const userInfo = useRecoilValue(userSelector);
  const guardianInfo = useRecoilValue(guardianSelector);
  const [info, setInfo] = useState<UserInfo | undefined>(undefined);

  useEffect(() => {
    const checkUserType = async () => {
      const isGuardian = await AsyncStorage.getItem('isGuardian');
      setInfo(isGuardian === 'Yes' ? guardianInfo : userInfo);
    };

    checkUserType();
  }, [userInfo, guardianInfo]);

  return info;
};
