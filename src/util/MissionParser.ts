import {MissionCareType} from '../types';

export class MissionParser {
  static parseMissionName(string: MissionCareType) {
    if (string === 'Manage blood sugar') return '혈당 관리';
    else if (string === 'Eat Medician') return '약 복용하기';
    else if (string === 'Eat food') return '식사 관리하기';
    else if (string === 'Manage blood pressure') return '혈당 관리하기';
    else {
      throw new Error(
        'MissionParser | parseMissionName : 미션 타입에 맞지 않는 인풋이 들어왔습니다.',
      );
    }
  }
}
