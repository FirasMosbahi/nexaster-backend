import { Patient } from '../schema/patient.schema';

export class UpdatePatientResponse {
  message: string = 'PATIENT_UPDATED_SUCCESSFULLY';
  data: Patient;
  constructor(data: Patient) {
    this.data = data;
  }
}

export class GetPatientsByDoctorResponse {
  message: string = 'PATIENTS_FETCHED_SUCCESSFULLY';
  data: Patient[];
  constructor(data: Patient[]) {
    this.data = data;
  }
}
