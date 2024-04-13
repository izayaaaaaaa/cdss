import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVitalSignsDto {
  @IsOptional()
  @IsDateString()
  DateTime: Date;

  @IsOptional()
  @IsNumber()
  Temperature: number;

  @IsOptional()
  @IsString()
  BloodPressure: string;

  @IsOptional()
  @IsNumber()
  PulseRate: number;

  @IsOptional()
  @IsNumber()
  OxygenSaturation: number;

  @IsOptional()
  @IsNumber()
  PainScale: number;
}
