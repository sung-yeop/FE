import {useRecoilValue} from 'recoil';
import {userSelector} from '../atoms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Todo} from '../types';
import {GetURL} from './GetUrl';

export class TodoAPI {
  static baseUrl = GetURL.baseUrl;

  static async getTodos() {
    const username = await AsyncStorage.getItem('username');
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${this.baseUrl}/todo/${username}/only_todo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `TodoAPI | getTodos - 할 일 목록을 불러오는데 실패했습니다. ${response.status}`,
      );
    }

    try {
      const data = await response.json();
      return data || [];
    } catch {
      // 파싱 실패하면 빈 배열 반환
      return [];
    }
  }

  static async addTodo(todo: Todo) {
    try {
      const username = await AsyncStorage.getItem('username');
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${this.baseUrl}/todo/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          todoId: todo.id,
          username: username,
          taskName: todo.title,
          taskDescription: todo.description || '',
          taskDate: todo.day,
          taskTime: todo.timer,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `TodoAPI | addTodo - Todo를 추가하는데 오류가 발생했습니다. ${response.status}`,
        );
      }

      return await response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
