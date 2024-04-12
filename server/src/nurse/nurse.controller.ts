import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { NurseService } from './nurse.service';
import { UpdateNurseDto } from './dto';

@Controller('nurse')
export class NurseController {
  constructor(private readonly nurseService: NurseService) {}
  @Get()
  findAll() {
    return this.nurseService.findAll();
  }

  @Get('available')
  getAvailableNurses() {
    return this.nurseService.getAvailableNurses();
  }

  @Get(':id')
  getNurseName(@Param('id') id: string) {
    return this.nurseService.getNurseName(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNurseDto) {
    return this.nurseService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nurseService.remove(+id);
  }
}
