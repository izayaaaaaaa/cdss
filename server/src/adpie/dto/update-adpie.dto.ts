import { IsOptional, IsEnum, IsString, IsNumber } from 'class-validator';
import { DocumentType } from '@prisma/client';

export class UpdateAdpieDto {
  @IsOptional()
  @IsEnum(DocumentType)
  DocumentType: DocumentType;

  @IsOptional()
  @IsString()
  Content: string;

  @IsOptional()
  @IsNumber()
  PatientID: number;
}
