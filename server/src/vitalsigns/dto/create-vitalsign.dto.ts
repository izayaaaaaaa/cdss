import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVitalSignsDto {
  @IsNotEmpty()
  @IsDateString()
  DateTime: Date;

  @IsNotEmpty()
  @IsNumber()
  Temperature: number;

  @IsNotEmpty()
  @IsString()
  BloodPressure: string;

  @IsNotEmpty()
  @IsNumber()
  PulseRate: number;

  @IsNotEmpty()
  @IsNumber()
  OxygenSaturation: number;

  @IsNotEmpty()
  @IsNumber()
  PainScale: number;
}
