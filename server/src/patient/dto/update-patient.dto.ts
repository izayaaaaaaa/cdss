import {
  IsString,
  IsDateString,
  IsOptional,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class UpdatePatientDto {
  @IsOptional()
  @IsString()
  Name: string;

  @IsOptional()
  @IsString()
  Age: string;

  @IsOptional()
  @IsString()
  Gender: string;

  @IsOptional()
  @IsString()
  PhoneNumber: string;

  @IsOptional()
  @IsString()
  EmailAddress: string;

  @IsOptional()
  @IsString()
  ChiefComplaint: string;

  @IsOptional()
  @IsString()
  MedicalHistory: string;

  @IsOptional()
  @IsBoolean()
  OutpatientAdmissionStatus: boolean;

  @IsOptional()
  @IsDateString()
  Date_Admitted: Date;

  @IsOptional()
  @IsString()
  AssignedRoomNumber: string;

  @IsOptional()
  @IsString()
  BedNumber: string;

  @IsOptional()
  @IsNumber()
  PhysicianInCharge: number;

  @IsOptional()
  @IsString()
  NurseNotes: string;

  @IsOptional()
  @IsString()
  FlowChart: string;

  @IsOptional()
  @IsNumber()
  NurseProfileID: number;
}
