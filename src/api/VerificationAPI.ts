import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetURL} from './GetUrl';

type Food = {
  foodName: string;
  carbohydrates: number;
  protein: number;
  fat: number;
  sodium: number;
};

export class VerificationAPI {
  static baseUrl = GetURL.baseUrl;

  static async verifyMeal(imageUri: string) {
    try {
      const formData = new FormData();

      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      } as any);

      const response = await fetch(
        'https://port-0-flask-m3k5a5gtc51bd19b.sel4.cloudtype.app/api/food',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(
          '[Verification] 인증이 정상적으로 진행되지 않았습니다.',
        );
      }
      return response.json();
    } catch (err) {
      console.error('인증 POST 에러 : ', err);
      throw err;
    }
  }

  static async verifyBloodSugar(imageUri: string) {
    try {
      const formData = new FormData();

      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      } as any);

      const response = await fetch(
        'https://port-0-flask-m3k5a5gtc51bd19b.sel4.cloudtype.app/api/glucose_digit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(
          '[Verification] 인증이 정상적으로 진행되지 않았습니다.',
        );
      }
      return response.json();
    } catch (err) {
      console.error('인증 POST 에러 : ', err);
      throw err;
    }
  }

  static async verifyBloodPressure(imageUri: string) {
    try {
      const formData = new FormData();

      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      } as any);

      const response = await fetch(
        'https://port-0-flask-m3k5a5gtc51bd19b.sel4.cloudtype.app/api/sphygmomanometer_digit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(
          '[Verification] 인증이 정상적으로 진행되지 않았습니다.',
        );
      }
      return response.json();
    } catch (err) {
      console.error('인증 POST 에러 : ', err);
      throw err;
    }
  }

  static async verifyMedication(imageUri: string) {
    try {
      const formData = new FormData();

      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      } as any);

      const response = await fetch(
        'https://port-0-flask-m3k5a5gtc51bd19b.sel4.cloudtype.app/api/sphygmomanometer_digit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(
          '[Verification] 인증이 정상적으로 진행되지 않았습니다.',
        );
      }
      return response.json();
    } catch (err) {
      console.error('인증 POST 에러 : ', err);
      throw err;
    }
  }

  static async sendFirstAlert(alarmId: string) {
    try {
      const token = await AsyncStorage.getItem('token');
      const username = await AsyncStorage.getItem('username');
      const today = new Date();
      today.setHours(today.getHours() + 9);

      const response = await fetch(`${this.baseUrl}/verification/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          alarmId: alarmId,
          username: username,
          verificationDateTime: today,
          value: 0,
          result: false,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Verification | sendFirstAlert Error : ${response.status}`,
        );
      }

      return response.json();
    } catch (err) {
      console.error(err);
    }
  }

  static async sendAlertWithBS(alarmId: string, value: number) {
    try {
      const token = await AsyncStorage.getItem('token');
      const username = await AsyncStorage.getItem('username');
      const today = new Date();
      today.setHours(today.getHours() + 9);

      const response = await fetch(`${this.baseUrl}/verification/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          alarmId: alarmId,
          username: username,
          verificationDateTime: today,
          value: value,
          result: true,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Verification | sendFirstAlert Error : ${response.status}`,
        );
      }

      return response.json();
    } catch (err) {
      console.error(err);
    }
  }

  static async sendAlertWithBP(alarmId: string, value: number, value2: number) {
    try {
      const token = await AsyncStorage.getItem('token');
      const username = await AsyncStorage.getItem('username');
      const today = new Date();
      today.setHours(today.getHours() + 9);

      const response = await fetch(`${this.baseUrl}/verification/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          alarmId: alarmId,
          username: username,
          verificationDateTime: today,
          value: value,
          value2: value2,
          result: true,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Verification | sendAlertWithBP Error : ${response.status}`,
        );
      }

      return response.json();
    } catch (err) {
      console.error(err);
    }
  }

  static async sendAlertWithFood(alarmId: string, foods: Food[]) {
    try {
      const token = await AsyncStorage.getItem('token');
      const username = await AsyncStorage.getItem('username');
      const today = new Date();
      today.setHours(today.getHours() + 9);

      const response = await fetch(`${this.baseUrl}/food/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          alarmId: alarmId,
          username: username,
          verificationDateTime: today,
          result: true,
          foods: foods,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Verification | sendAlertWithFood Error : ${response.status}`,
        );
      }

      return response.json();
    } catch (err) {
      console.error(err);
    }
  }
}
