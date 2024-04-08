import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signin(dto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { LicenseNo: dto.LicenseNo },
    });

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const pwMatches = user.Password === dto.Password;
    if (!pwMatches) {
      throw new ForbiddenException('Invalid credentials');
    }

    const user_id = user.UserID;

    return user_id;
  }
}
