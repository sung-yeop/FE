import {atom, DefaultValue, selector} from 'recoil';
import {Alarm, Report, SeniorInfo, Todo, User, UserInfo} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Parser} from './util/Parser';
import {GuardianAPI} from './api/GuardianAPI';
import {getAlarms} from './api/AlarmAPI';
import {UserAPI} from './api/UserAPI';
import {TodoAPI} from './api/TodoAPI';

export const STORAGE_ALARM_KEY = 'alarms';
export const STORAGE_TODO_KEY = 'todos';
export const STORAGE_MANAGE_KEY = 'seniors';
const today = new Date();
today.setHours(today.getHours() + 9);

export const allAlarmsState = atom<Alarm[]>({
  key: 'allAlarmsState',
  default: [],
  effects: [
    ({setSelf, onSet}) => {
      const loadInitialValue = async () => {
        try {
          const isGuardian = await AsyncStorage.getItem('isGuardian');

          let savedValue = null;
          if (isGuardian === 'Yes') {
            const result = await GuardianAPI.getAlarms();
            console.log('Atoms | API 호출 결과 알람 : ', result);
            savedValue = Parser.parseAlarmFormGuardian(result) as Alarm[];
          } else if (isGuardian === 'No') {
            savedValue = Parser.parseAlarmForm(await getAlarms()) as Alarm[];
          }

          if (savedValue != null) {
            setSelf(savedValue);
          }
        } catch (error) {
          console.error('Error loading alarms:', error);
        }
      };

      loadInitialValue();

      onSet((newValue, _) => {
        AsyncStorage.setItem(STORAGE_ALARM_KEY, JSON.stringify(newValue)).catch(
          error => console.error('Error saving alarms:', error),
        );
      });
    },
  ],
});

export const allAlarmsSelector = selector({
  key: 'allAlarmsSelector',
  get: ({get}) => get(allAlarmsState),
  set: ({set}, newValue: DefaultValue | Alarm[] | []) =>
    set(allAlarmsState, newValue),
});

export const currentReportState = atom<Report>({
  key: 'currentReportState',
  default: {
    mission: undefined,
    duration: {startDate: today, endDate: today},
  },
});

export const currentReportSelector = selector({
  key: 'currentReportSelector',
  get: ({get}) => get(currentReportState),
  set: ({set}, newValue: Report | DefaultValue) =>
    set(currentReportState, newValue),
});

export const currentGuardianReportState = atom<Report & {username: string}>({
  key: 'currentGuardianReportState',
  default: {
    username: '',
    mission: undefined,
    duration: {startDate: today, endDate: today},
  },
});

export const currentGuardianReportSelector = selector({
  key: 'currentGuardianReportSelector',
  get: ({get}) => get(currentGuardianReportState),
  set: ({set}, newValue: (Report & {username: string}) | DefaultValue) =>
    set(currentGuardianReportState, newValue),
});

export const allTodoState = atom<Todo[]>({
  key: 'allTodoState',
  default: [],
  effects: [
    ({setSelf, onSet}) => {
      const loadInitialValue = async () => {
        try {
          const isGuardian = await AsyncStorage.getItem('isGuardian');
          if (isGuardian === 'No') {
            const savedValue = await TodoAPI.getTodos();
            console.log('API 호출 결과 Todos : ', savedValue);
            if (savedValue != null) {
              setSelf(Parser.parseTodoForm(savedValue) as Todo[]);
            }
          }
        } catch (error) {
          console.error('Error loading alarms:', error);
        }
      };

      loadInitialValue();

      onSet((newValue, _) => {
        AsyncStorage.setItem(STORAGE_TODO_KEY, JSON.stringify(newValue)).catch(
          error => console.error('Error saving alarms:', error),
        );
      });
    },
  ],
});

export const allTodoSelector = selector({
  key: 'allTodoSelector',
  get: ({get}) => get(allTodoState),
  set: ({set}, newValue: DefaultValue | Todo[] | []) =>
    set(allTodoState, newValue),
});

export const allManagingSeniorsState = atom<SeniorInfo[]>({
  key: 'allManagingSeniorsState',
  default: [],
  effects: [
    ({setSelf, onSet}) => {
      const loadInitialValue = async () => {
        try {
          const response = await GuardianAPI.getSeniors();
          if (response !== null) {
            setSelf(response);
          }
        } catch (error) {
          console.error('Error Seniors:', error);
        }
      };

      loadInitialValue();

      onSet((newValue, _) => {
        AsyncStorage.setItem(
          STORAGE_MANAGE_KEY,
          JSON.stringify(newValue),
        ).catch(error => console.error('Error saving Seniors:', error));
      });
    },
  ],
});

export const allManagingSeniorsSelector = selector({
  key: 'allManagingSeniorsSelector',
  get: ({get}) => get(allManagingSeniorsState),
  set: ({set}, newValue: DefaultValue | SeniorInfo[] | []) =>
    set(allManagingSeniorsState, newValue),
});

export const selectSeniorState = atom<SeniorInfo | undefined>({
  key: 'selectSeniorState',
  default: undefined,
});

export const selectSeniorSelector = selector({
  key: 'selectSeniorSelector',
  get: ({get}) => get(selectSeniorState),
  set: ({set}, newValue: DefaultValue | SeniorInfo | undefined) =>
    set(selectSeniorState, newValue),
});

export const guardianState = atom<UserInfo | undefined>({
  key: 'guardianState',
  default: {id: '', name: '', phoneNumber: ''},
});

export const guardianSelector = selector({
  key: 'guardianSelector',
  get: ({get}) => get(guardianState),
  set: ({set}, newValue: DefaultValue | UserInfo | undefined) =>
    set(guardianState, newValue),
});

export const userState = atom<UserInfo | undefined>({
  key: 'userState',
  default: {id: '', name: '', phoneNumber: ''},
});

export const userSelector = selector({
  key: 'userSelector',
  get: ({get}) => get(userState),
  set: ({set}, newValue: DefaultValue | UserInfo | undefined) =>
    set(userState, newValue),
});
