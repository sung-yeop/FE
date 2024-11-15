import {Alarm, MissionCareType, Todo} from '../types';

export class Parser {
  static parseForm(savedValue: string): Alarm[] | Todo[] {
    try {
      const parsedData = JSON.parse(savedValue);

      if (!Array.isArray(parsedData)) {
        return [];
      }

      return parsedData.map(data => ({
        ...data,
        timer: new Date(data.timer),
      }));
    } catch (error) {
      console.error('Error parsing alarms:', error);
      return [];
    }
  }
}
