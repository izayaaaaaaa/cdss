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
  create(@Body() createAdpieDto: CreateAdpieDto) {
    return this.adpieService.create(createAdpieDto);
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
  update(@Param('id') id: string, @Body() dto: UpdateAdpieDto) {
    console.log('update adpie controller');
    console.log('update adpie controller id: ', id);
    console.log('update adpie controller dto: ', dto);
    return this.adpieService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adpieService.remove(+id);
  }
}
