import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetURL} from './GetUrl';

export class ReportAPI {
  static baseUrl = GetURL.baseUrl;

  static async getMissions() {
    try {
      const username = await AsyncStorage.getItem('username');
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(
        `${this.baseUrl}/verification/reports/${username}`,
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

  static async getReportBS({
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
      console.log('Mission Name : ', missionName);
      const token = await AsyncStorage.getItem('token');
      const username = await AsyncStorage.getItem('username');
      const response = await fetch(`${this.baseUrl}/verification/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: username,
          missionName: missionName,
          startDate: startDate,
          endDate: endDate,
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

  static async getReportBP({
    missionName,
    startDate,
    endDate,
  }: {
    missionName: string;
    startDate: string;
    endDate: string;
  }) {
    try {
      const token = await AsyncStorage.getItem('token');
      const username = await AsyncStorage.getItem('username');
      const response = await fetch(
        `${this.baseUrl}/verification/report/bloodPressure`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: username,
            missionName: missionName,
            startDate: startDate,
            endDate: endDate,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Report - getReport 에러 : ${response.status}`);
      }

      return response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async getFoodReport(reportDate: Date) {
    try {
      const token = await AsyncStorage.getItem('token');
      const username = await AsyncStorage.getItem('username');
      const response = await fetch(`${this.baseUrl}/food/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: username,
          reportDate: reportDate,
        }),
      });

      if (!response.ok) {
        throw new Error(`Report - getFoodReport 에러 : ${response.status}`);
      }

      return response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /////

  static async getGuardianReportBS({
    missionName,
    startDate,
    endDate,
    username,
  }: {
    missionName: string;
    startDate: string;
    endDate: string;
    username: string;
  }) {
    try {
      console.log('ReportAPI | startDate : ', startDate);
      console.log('ReportAPI | endDate : ', endDate);
      console.log('Mission Name : ', missionName);
      const token = await AsyncStorage.getItem('token');
      const guardianName = await AsyncStorage.getItem('username');
      const response = await fetch(`${this.baseUrl}/guardian/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          guardianName: guardianName,
          username: username,
          missionName: missionName,
          startDate: startDate,
          endDate: endDate,
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

  static async getGuardianReportBP({
    missionName,
    startDate,
    endDate,
    username,
  }: {
    missionName: string;
    startDate: string;
    endDate: string;
    username: string;
  }) {
    try {
      const token = await AsyncStorage.getItem('token');
      const guardianName = await AsyncStorage.getItem('username');
      const response = await fetch(
        `${this.baseUrl}/guardian/report/bloodPressure`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            guardianName: guardianName,
            username: username,
            missionName: missionName,
            startDate: startDate,
            endDate: endDate,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Report - getReport 에러 : ${response.status}`);
      }

      return response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async getGuardianFoodReport(reportDate: Date, username: string) {
    try {
      const token = await AsyncStorage.getItem('token');
      const guardianName = await AsyncStorage.getItem('username');
      const response = await fetch(`${this.baseUrl}/guardian/report/food`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          guardianName: guardianName,
          username: username,
          reportDate: reportDate,
        }),
      });

      console.log('ReportAPI | getGuardianFoodReport : ', response);

      if (!response.ok) {
        throw new Error(
          `Report - getGuardianFoodReport 에러 : ${response.status}`,
        );
      }

      return response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
