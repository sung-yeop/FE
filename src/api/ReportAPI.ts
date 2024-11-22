import AsyncStorage from '@react-native-async-storage/async-storage';

export class ReportAPI {
  static async getMissions() {
    try {
      const username = await AsyncStorage.getItem('username');
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(
        `http://10.0.2.2:8080/verification/reports/${username}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Report - getMissions 에러 : ${response.status}`);
      }

      return response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async getReport({
    missionName,
    startDate,
    endDate,
  }: {
    missionName: string;
    startDate: string;
    endDate: string;
  }) {
    try {
      console.log('ReportAPI | startDate : ', startDate);
      console.log('ReportAPI | endDate : ', endDate);
      const token = await AsyncStorage.getItem('token');
      const username = await AsyncStorage.getItem('username');
      const response = await fetch('http://10.0.2.2:8080/verification/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: username,
          missionName,
          startDate,
          endDate,
        }),
      });

      if (!response.ok) {
        throw new Error(`Report - getReport 에러 : ${response.status}`);
      }

      return response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
