import { Module } from '@nestjs/common';
import { AdpieService } from './adpie.service';
import { AdpieController } from './adpie.controller';

@Module({
  controllers: [AdpieController],
  providers: [AdpieService],
})
export class AdpieModule {}
