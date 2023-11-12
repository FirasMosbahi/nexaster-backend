import { WeekDaysEnum } from '../enums/visits.enum';

export class SpecialDate {
  weekDay: WeekDaysEnum;
  day: number;
  month: number;
  static fromDate = (date: Date): SpecialDate => ({
    weekDay: date.getDay(),
    month: date.getMonth(),
    day: date.getDate(),
  });
}
