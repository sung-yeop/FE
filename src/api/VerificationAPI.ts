import AsyncStorage from '@react-native-async-storage/async-storage';

type Food = {
  foodName: string;
  carbohydrates: number;
  protein: number;
  fat: number;
  sodium: number;
};

export class VerificationAPI {
  static async sendAIServer(imageUri: string) {
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

  // {
  //   "alarmId": 0,
  //   "username": "string",
  //   "verificationDateTime": "2024-11-21T12:49:36.097Z",
  //   "value": 0,
  //   "result": true
  // }

  static async sendFirstAlert(alarmId: string) {
    try {
      const token = await AsyncStorage.getItem('token');
      const username = await AsyncStorage.getItem('username');
      const date = new Date();
      date.setHours(date.getHours() + 9);
      const response = await fetch('http://10.0.2.2:8080/verification/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          alarmId: alarmId,
          username: username,
          verificationDateTime: date,
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
      const date = new Date();
      date.setHours(date.getHours() + 9);
      date.setDate(date.getDate() + 2);
      const response = await fetch('http://10.0.2.2:8080/verification/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          alarmId: alarmId,
          username: username,
          verificationDateTime: date,
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
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2);

      const date = new Date();
      date.setHours(date.getHours() + 9);

      const response = await fetch('http://10.0.2.2:8080/verification/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          alarmId: alarmId,
          username: username,
          verificationDateTime: tomorrow,
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
    console.log('Enter Food : ', foods);
    try {
      const token = await AsyncStorage.getItem('token');
      const username = await AsyncStorage.getItem('username');
      const date = new Date();
      date.setHours(date.getHours() + 9);
      const response = await fetch('http://10.0.2.2:8080/food/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          alarmId: alarmId,
          username: username,
          verificationDateTime: date,
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
