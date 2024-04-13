import { Module } from '@nestjs/common';
import { VitalsignsService } from './vitalsigns.service';
import { VitalsignsController } from './vitalsigns.controller';

@Module({
  controllers: [VitalsignsController],
  providers: [VitalsignsService],
})
export class VitalsignsModule {}
