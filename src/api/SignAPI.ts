// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const sendSignUpData = async ({
//   username,
//   name,
//   phoneNumber,
//   password,
// }: {
//   username: string;
//   name: string;
//   password: string;
//   phoneNumber: string;
// }) => {
//   try {
//     const response = await fetch('http://10.0.2.2:8080/user/join', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username: username,
//         name: name,
//         password: password,
//         phoneNumber: phoneNumber,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('회원가입에 실패했습니다.');
//     }

//     const data = await response.json();
//     AsyncStorage.setItem('username', data.username);
//     return data;
//   } catch (error) {
//     console.error('회원가입 에러:', error);
//     throw error;
//   }
// };

// export const sendSignInData = async ({
//   username,
//   password,
// }: {
//   username: string;
//   password: string;
// }) => {
//   try {
//     const response = await fetch('http://10.0.2.2:8080/login/user', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username,
//         password,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('로그인에 실패했습니다.');
//     }

//     const token = response.headers.get('Authorization');

//     if (token) {
//       const actualToken = token.replace('Bearer ', '');
//       await AsyncStorage.setItem('token', actualToken);
//       return actualToken;
//     }

//     throw new Error('토큰이 없습니다.');
//   } catch (error) {
//     console.error('로그인 에러:', error);
//     throw error;
//   }
// };
