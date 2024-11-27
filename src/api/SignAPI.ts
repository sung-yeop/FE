import AsyncStorage from '@react-native-async-storage/async-storage';
import Success from '../screens/ConfirmScreen/Success';

export const sendSignUpWithUser = async ({
  username,
  name,
  phoneNumber,
  password,
  age,
  gender,
}: {
  username: string;
  name: string;
  password: string;
  phoneNumber: string;
  age: number;
  gender: string;
}) => {
  try {
    const response = await fetch('http://10.0.2.2:8080/user/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        name: name,
        password: password,
        phoneNumber: phoneNumber,
        age: age,
        gender: gender,
      }),
    });

    console.log('username : ', username);
    console.log('name : ', name);
    console.log('password : ', password);
    console.log('phoneNumber : ', phoneNumber);
    console.log('age : ', age);
    console.log('gender : ', gender);

    if (!response.ok) {
      throw new Error(`회원가입에 실패했습니다. : ${response.status}`);
    }
  } catch (error) {
    console.error('회원가입 에러:', error);
    throw error;
  }
};

export const sendSignUpWithGuardian = async ({
  username,
  name,
  phoneNumber,
  password,
}: {
  username: string;
  name: string;
  password: string;
  phoneNumber: string;
}) => {
  try {
    const response = await fetch('http://10.0.2.2:8080/guardian/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        guardianName: username,
        password: password,
        name: name,
        phoneNumber: phoneNumber,
      }),
    });

    if (!response.ok) {
      throw new Error('회원가입에 실패했습니다.');
    }
  } catch (error) {
    console.error('회원가입 에러:', error);
    throw error;
  }
};

export const sendSignInDataWithUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await fetch('http://10.0.2.2:8080/login/user', {
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

export const sendSignInDataWithGuardian = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await fetch('http://10.0.2.2:8080/login/guardian', {
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
    // 로그인시점에 사용한 아이디를 로컬 스토리지에 저장
    // 각 API 호출시 username을 사용해서 통신 예정

    if (token) {
      const actualToken = token.replace('Bearer ', '');
      await AsyncStorage.setItem('token', actualToken);
      await AsyncStorage.setItem('isGuardian', 'Yes');
      await AsyncStorage.setItem('username', username);
      return {result: true, msg: '로그인 성공 / 토큰 발급 완료'};
    }

    return {result: false, msg: '토큰 없음'};
  } catch (error) {
    console.error('로그인 에러:', error);
    return {result: false, msg: '에러 발생'};
  }
};
