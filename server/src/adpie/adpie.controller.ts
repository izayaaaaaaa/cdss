import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdpieService } from './adpie.service';
import { CreateAdpieDto, UpdateAdpieDto } from './dto';

@Controller('adpie')
export class AdpieController {
  constructor(private readonly adpieService: AdpieService) {}

  @Post()
  create(
    @Body() createAdpieDto: CreateAdpieDto,
    @Body('patientId') patientId: number,
  ) {
    return this.adpieService.create(createAdpieDto, patientId);
  }

  @Get()
  findAll() {
    return this.adpieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adpieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdpieDto: UpdateAdpieDto) {
    return this.adpieService.update(+id, updateAdpieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adpieService.remove(+id);
  }
}
