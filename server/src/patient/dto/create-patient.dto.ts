import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  Name: string;

  @IsNotEmpty()
  @IsString()
  Age: string;

  @IsNotEmpty()
  @IsString()
  Gender: string;

  @IsNotEmpty()
  @IsString()
  PhoneNumber: string;

  @IsNotEmpty()
  @IsString()
  EmailAddress: string;

  @IsNotEmpty()
  @IsString()
  ChiefComplaint: string;

  @IsNotEmpty()
  @IsString()
  MedicalHistory: string;

  @IsNotEmpty()
  @IsDateString()
  Date_Admitted: Date;
}
