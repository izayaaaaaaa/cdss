import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { DoctorService } from './doctor.service';
// import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  getDoctorName(@Param('id') ProfileID: string) {
    return this.doctorService.getDoctorName(+ProfileID);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
  //   return this.doctorService.update(+id, updateDoctorDto);
  // }
}
