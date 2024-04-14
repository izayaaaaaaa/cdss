import { IsOptional, IsString } from 'class-validator';

export class UpdateAssessmentDto {
  @IsOptional()
  @IsString()
  HealthHistory: string;

  @IsOptional()
  @IsString()
  ChiefComplaint: string;

  @IsOptional()
  @IsString()
  HistoryOfPresentIllness: string;

  @IsOptional()
  @IsString()
  PastMedicalHistory: string;

  @IsOptional()
  @IsString()
  SocialHistory: string;

  @IsOptional()
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
