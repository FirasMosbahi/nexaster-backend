import { DayVisitsEnum, WeekDaysEnum } from '../enums/visits.enum';

export type DayVisits = Set<DayVisitsEnum>;
export type Availability = Map<WeekDaysEnum, DayVisits>;
