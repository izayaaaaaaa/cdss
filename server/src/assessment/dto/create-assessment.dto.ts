import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAssessmentDto {
  @IsNotEmpty()
  @IsString()
  HealthHistory: string;

  @IsNotEmpty()
  @IsString()
  ChiefComplaint: string;

  @IsNotEmpty()
  @IsString()
  HistoryOfPresentIllness: string;

  @IsNotEmpty()
  @IsString()
  PastMedicalHistory: string;

  @IsNotEmpty()
  @IsString()
  SocialHistory: string;

  @IsNotEmpty()
  @IsString()
  NurseNotes: string;

  @IsOptional()
  LaboratoryTests: any;

  @IsOptional()
  PhysicalExaminations: any;

  @IsOptional()
  DiagnosticTests: any;

  @IsOptional()
  ImagingStudies: any;
}
