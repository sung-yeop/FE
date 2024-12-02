import {ReportAPI} from '../api/ReportAPI';
import {Report} from '../types';
import {Parser} from './Parser';

export class ReportUtil {
  static async getReport(report: Report) {
    const {mission, duration} = report;
    const {startDate, endDate} = duration;
    const filterdStartDate = Parser.parseDateToYMD(startDate);
    const filteredEndDate = Parser.parseDateToYMD(endDate);

    let response;

    if (!mission || !duration)
      throw new Error(
        'ReportUtils | ReportUtil - report가 정의되어있지 않습니다.',
      );

    if (report.mission === 'Eat food') {
      response = await ReportAPI.getFoodReport(new Date().toISOString());
    } else if (report.mission === 'Manage blood sugar') {
      response = await ReportAPI.getReportBS({
        missionName: mission,
        startDate: filterdStartDate,
        endDate: filteredEndDate,
      });
    } else if (report.mission === 'Manage blood pressure') {
      response = await ReportAPI.getReportBP({
        missionName: mission,
        startDate: filterdStartDate,
        endDate: filteredEndDate,
      });
    }

    return response;
  }
}
