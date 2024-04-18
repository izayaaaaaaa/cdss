import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VitalsignsService } from './vitalsigns.service';
import { CreateVitalSignsDto, UpdateVitalSignsDto } from './dto';

@Controller('vitalsigns')
export class VitalsignsController {
  constructor(private readonly vitalsignsService: VitalsignsService) {}

  @Post()
  create(@Body() dto: CreateVitalSignsDto) {
    return this.vitalsignsService.create(dto);
  }

  @Get()
  findAll() {
    return this.vitalsignsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vitalsignsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVitalSignsDto) {
    return this.vitalsignsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vitalsignsService.remove(+id);
  }
}
