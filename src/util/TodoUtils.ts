export class TodoUtil {
  static parseDayFromDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  static calculateDday = (targetDate: string) => {
    const today = new Date();
    const dDay = new Date(targetDate);

    today.setHours(0, 0, 0, 0);
    dDay.setHours(0, 0, 0, 0);

    const diffTime = dDay.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'D-Day';
    else if (diffDays > 0) return `D-${diffDays}`;
    else return `D+${Math.abs(diffDays)}`;
  };
}
