import AsyncStorage from '@react-native-async-storage/async-storage';
import {ReportAPI} from '../types';

export const reportSend = async ({mission, startDate, endDate}: ReportAPI) => {
  try {
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
        missionName: mission,
        startDate: startDate,
        endDate: endDate,
      }),
    });

    if (!response.ok) {
      throw new Error('[POST] 리포트를 제대로 불러오지 못했습니다.');
    }
    const jsonData = JSON.parse(await response.text());
    console.log('Parsed JSON data:', jsonData);

    return jsonData;
  } catch (err) {
    console.error('리포트 POST 에러 : ', err);
    throw err;
  }
};

export const getMissionFromReport = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    // const response = await fetch(
    //   'http://10.0.2.2:8080/verification/report/asdf',
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`,
    //     },
    //   },
    // );

    // if (!response.ok) {
    //   throw new Error('[GET] 리포트를 제대로 불러오지 못했습니다.');
    // }

    // return await response.json();
    return JSON.parse((await AsyncStorage.getItem('missions')) as string);
  } catch (err) {
    console.error('리포트 GET 에러 : ', err);
    throw err;
  }
};
