import { IsNotEmpty, IsEnum, IsString, IsNumber } from 'class-validator';
import { DocumentType } from '@prisma/client';

export class CreateAdpieDto {
  @IsNotEmpty()
  @IsEnum(DocumentType)
  DocumentType: DocumentType;

  @IsNotEmpty()
  @IsString()
  Content: string;

  @IsNotEmpty()
  @IsNumber()
  PatientID: number;
}
