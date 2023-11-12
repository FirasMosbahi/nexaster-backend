export class MedicalFolder {
  MRI?: string;
  CT_Scan?: string;
}
export class Weight {
  actualWeight: number;
  bodyFat?: number;
  waterPercentage?: number;
}
class HeartRateData {
  date: Date;
  pulse: number;
}
class SleepData {
  deep: number;
  high: number;
  rem: number;
  awake: number;
}
class StressData {
  date: Date;
  level: number;
}
export class MedicalStatus {
  heartRate: HeartRateData[] = [];
  sleep: SleepData[] = [];
  stress: StressData[] = [];
}
