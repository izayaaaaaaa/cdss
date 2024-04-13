import { IsOptional, IsString } from 'class-validator';

export class UpdateAdpieDto {
  @IsOptional()
  @IsString()
  Diagnosis: string;

  @IsOptional()
  @IsString()
  Planning: string;

  @IsOptional()
  @IsString()
  InterventionImplementation: string;

  @IsOptional()
  @IsString()
  Evaluation: string;
}
