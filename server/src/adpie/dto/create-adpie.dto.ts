import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdpieDto {
  @IsNotEmpty()
  @IsString()
  Diagnosis: string;

  @IsNotEmpty()
  @IsString()
  Planning: string;

  @IsNotEmpty()
  @IsString()
  InterventionImplementation: string;

  @IsNotEmpty()
  @IsString()
  Evaluation: string;
}
