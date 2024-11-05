import {atom, DefaultValue, selector} from 'recoil';
import {Alarm, Report, ReportDuration, Todo, User} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_ALARM_KEY = 'alarms';
export const STORAGE_TODO_KEY = 'todos';

export const allAlarmsState = atom<Alarm[]>({
  key: 'allAlarmsState',
  default: [],
  effects: [
    ({setSelf, onSet}) => {
      // Load initial value from AsyncStorage
      const loadInitialValue = async () => {
        try {
          const savedValue = await AsyncStorage.getItem(STORAGE_ALARM_KEY);
          if (savedValue != null) {
            setSelf(JSON.parse(savedValue));
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

// 어플을 시작할 때 백엔드 서버와 로컬 스토리지의 데이터 동기화를 진행
export const loadAlarms = async () => {
  try {
    await AsyncStorage.clear();
    const savedAlarms = await AsyncStorage.getItem(STORAGE_ALARM_KEY);
    if (savedAlarms !== null) {
      return JSON.parse(savedAlarms) as Alarm[];
    }
  } catch (error) {
    console.error('Error loading alarms:', error);
  }
  return [] as Alarm[];
};

export const currentReportState = atom<Report>({
  key: 'currentReportState',
  default: {mission: undefined, duration: 'Today'},
});

export const currentReportSelector = selector({
  key: 'currentReportSelector',
  get: ({get}) => get(currentReportState),
  set: ({set}, newValue: Report | DefaultValue) =>
    set(currentReportState, newValue),
});

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const allTodoState = atom<Todo[]>({
  key: 'allTodoState',
  default: [],
  effects: [
    ({setSelf, onSet}) => {
      const loadInitialValue = async () => {
        try {
          const savedValue = await AsyncStorage.getItem(STORAGE_TODO_KEY);
          if (savedValue != null) {
            setSelf(JSON.parse(savedValue));
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
