import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {userState} from '../atoms';
import {LoginResponse} from '../types';

export const LOGIN_KEY = 'login_token';
const API_URL = 'http://10.0.2.2:8080'; // Android 에뮬레이터 사용시

export const useLoginManager = () => {
  const setUser = useSetRecoilState(userState);

  const login = async ({id, password}: {id: string; password: string}) => {
    try {
      // 실제로는 여기서 백엔드 API를 호출하여 로그인을 수행합니다.
      // 예시 응답:
      const response: LoginResponse = {
        token: 'example_token',
        user: {id, name: 'Example User'},
      };

      await AsyncStorage.setItem(LOGIN_KEY, JSON.stringify(response));
      setUser(response.user);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(LOGIN_KEY);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const checkLoginStatus = async () => {
    try {
      const storedData = await AsyncStorage.getItem(LOGIN_KEY);
      if (storedData) {
        const parsedData: LoginResponse = JSON.parse(storedData);
        // 여기서 토큰의 유효성을 검사하는 로직을 추가할 수 있습니다.
        // 예: 백엔드에 토큰 유효성 검사 요청
        setUser(parsedData.user);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return {
    login,
    logout,
    checkLoginStatus,
  };
};
