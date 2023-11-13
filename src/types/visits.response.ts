import { SpecialDate } from './SpecialDate';
import { Visit } from '../schema/visits.schema';
import { DayVisitsEnum } from '../enums/visits.enum';

export class GetVisitsByDoctorResponse {
  message = 'VISITS_FETCHED_SUCCESSFULLY';
  data: Map<SpecialDate, Visit[]>;
  constructor(data: Map<SpecialDate, Visit[]>) {
    this.data = data;
  }
}
export class GetDoctorAvailabilityResponse {
  message = 'DOCTOR_AVAILABILITY_CALCULATED_SUCCESSFULLY';
  data: DayVisitsEnum[];
  constructor(data: DayVisitsEnum[]) {
    this.data = data;
  }
}

export class AskForVisitResponse {
  message = 'VISIT_ASKED_SUCCESSFULLY';
  data: Visit;
  constructor(data: Visit) {
    this.data = data;
  }
}
export class AcceptVisitResponse {
  message = 'VISIT_ACCEPTED_SUCCESSFULLY';
  data: Visit;
  constructor(data: Visit) {
    this.data = data;
  }
}
export class ReportVisitResponse {
  message = 'VISIT_REPORTED_SUCCESSFULLY';
  data: Visit;
  constructor(data: Visit) {
    this.data = data;
  }
}
export class AcceptReportedVisitResponse {
  message = 'REPORTED_VISIT_ACCEPTED_SUCCESSFULLY';
  data: Visit;
  constructor(data: Visit) {
    this.data = data;
  }
}

export class GetMyVisitsResponse {
  message = 'VISITS_FETCHED_SUCCESSFULLY';
  data: Visit[];
  constructor(data: Visit[]) {
    this.data = data;
  }
}
