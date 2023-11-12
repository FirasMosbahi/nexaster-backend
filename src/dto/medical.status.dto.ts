import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class WeightDto {
  @IsNumber()
  actualWeight: number;
  @IsOptional()
  @IsNumber()
  bodyFat?: number;
  @IsOptional()
  @IsNumber()
  waterPercentage?: number;
}
export class HeartRateDto {
  @IsDate()
  date: Date;
  @IsNumber()
  pulse: number;
}
export class SleepDto {
  @IsNumber()
  deep: number;
  @IsNumber()
  high: number;
  @IsNumber()
  rem: number;
  @IsNumber()
  awake: number;
}
export class StressDto {
  @IsDate()
  date: Date;
  @IsNumber()
  level: number;
}
