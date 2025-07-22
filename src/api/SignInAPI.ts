import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetURL} from './GetUrl';

export class SignInAPI {
  static baseUrl = GetURL.baseUrl;

  static sendSignInDataWithUser = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      await AsyncStorage.clear();
      const response = await fetch(`${this.baseUrl}/login/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        return {result: false, msg: '로그인 실패'};
      }

      const token = response.headers.get('Authorization');

      if (token) {
        const actualToken = token.replace('Bearer ', '');
        await AsyncStorage.setItem('token', actualToken);
        await AsyncStorage.setItem('isGuardian', 'No');
        await AsyncStorage.setItem('username', username);
        return {result: true, msg: '로그인 성공 / 토큰 발급 완료'};
      }
      return {result: false, msg: '토큰 없음'};
    } catch (error) {
      console.error('로그인 에러:', error);
      return {result: false, msg: '에러 발생'};
    }
  };

  static sendSignInDataWithGuardian = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      await AsyncStorage.clear();
      const response = await fetch(`${this.baseUrl}/login/guardian`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        return {result: false, msg: '로그인 실패!'};
      }

      const token = response.headers.get('Authorization');

      console.log('RESPONSE :', response);

      if (token) {
        const actualToken = token.replace('Bearer ', '');
        await AsyncStorage.setItem('token', actualToken);
        await AsyncStorage.setItem('isGuardian', 'Yes');
        await AsyncStorage.setItem('username', username);

        console.log('username : ', username);
        return {result: true, msg: '로그인 성공 / 토큰 발급 완료'};
      }

      return {result: false, msg: '토큰 없음'};
    } catch (error) {
      console.error('로그인 에러:', error);
      return {result: false, msg: '에러 발생'};
    }
  };
}
