// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Alarm} from '../types';
// import {TimeFormattingForSendingAPI} from '../util/AlarmUtils';

// export const newAlarmSend = async (alarm: Alarm) => {
//   try {
//     const token = await AsyncStorage.getItem('token');
//     const username = await AsyncStorage.getItem('username');
//     const response = await fetch('http://10.0.2.2:8080/alarm/add', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`, // JWT 토큰 추가
//       },
//       body: JSON.stringify({
//         alarmId: alarm.alarmid,
//         username: username,
//         alarmTime: alarm.timer,
//         active: alarm.active,
//         alarmDays: alarm.alarmDays,
//         delayTimes: alarm.delayTimes,
//         restrictAlarm: alarm.mission.mode,
//         missionName: alarm.mission.id,
//         isVibration: alarm.setting.isVibration,
//         volume: alarm.setting.volume,
//         alarmInterval: alarm.setting.alarmInterval,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('알람 저장에 실패했습니다.');
//     }

//     return await response.json();
//   } catch (err) {
//     console.error('알람 저장 에러 : ', err);
//     throw err;
//   }
// };
