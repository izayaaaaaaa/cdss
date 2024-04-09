import { Controller, Get, Param } from '@nestjs/common';
import { NurseService } from './nurse.service';
// import { CreateNurseDto } from './dto/create-nurse.dto';
// import { UpdateNurseDto } from './dto/update-nurse.dto';

@Controller('nurse')
export class NurseController {
  constructor(private readonly nurseService: NurseService) {}

  // @Post()
  // create(@Body() createNurseDto: CreateNurseDto) {
  //   return this.nurseService.create(createNurseDto);
  // }

  @Get()
  findAll() {
    return this.nurseService.findAll();
  }

  @Get(':id')
  getNurseName(@Param('id') id: string) {
    return this.nurseService.getNurseName(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNurseDto: UpdateNurseDto) {
  //   return this.nurseService.update(+id, updateNurseDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.nurseService.remove(+id);
  // }
}
