import AsyncStorage from '@react-native-async-storage/async-storage';

export class UserAPI {
  static async getUserInfo() {
    try {
      const username = await AsyncStorage.getItem('username');
      const token = await AsyncStorage.getItem('token');

      console.log('Username : ', username);
      const response = await fetch(`http://10.0.2.2:8080/user/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`UserAPI | getUserInfo - api 오류 ${response.status}`);
      }

      const text = await response.text();
      return JSON.parse(text);
    } catch (err) {
      console.error(err);
    }
  }
}
