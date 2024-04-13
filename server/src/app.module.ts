import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { NurseModule } from './nurse/nurse.module';
import { PatientModule } from './patient/patient.module';
import { VitalsignsModule } from './vitalsigns/vitalsigns.module';
import { AdpieModule } from './adpie/adpie.module';
import { AssessmentModule } from './assessment/assessment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    DoctorModule,
    NurseModule,
    PatientModule,
    VitalsignsModule,
    AdpieModule,
    AssessmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
