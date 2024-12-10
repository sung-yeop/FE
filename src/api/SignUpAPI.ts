import {GetURL} from './GetUrl';

export class SignUpAPI {
  static baseUrl = GetURL.baseUrl;

  static async sendSignUpWithUser({
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
  }) {
    try {
      const response = await fetch(`${this.baseUrl}/user/join`, {
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

      if (!response.ok) {
        throw new Error(`회원가입에 실패했습니다. : ${response.status}`);
      }
    } catch (error) {
      console.error('회원가입 에러:', error);
      throw error;
    }
  }

  static sendSignUpWithGuardian = async ({
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
      const response = await fetch(`${this.baseUrl}/guardian/join`, {
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

  static async checkDuplicateUsername(username: string) {
    try {
      const response = await fetch(`${this.baseUrl}/user/${username}/check`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`오류 발생 : ${response.status}`);
      }

      return response.json();
    } catch (err) {
      console.error(err);
    }
  }
}
