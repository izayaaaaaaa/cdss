import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  LicenseNo: string;

  @IsString()
  @IsNotEmpty()
  Password: string;
}
