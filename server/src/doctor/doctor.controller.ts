import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { UpdateDoctorDto } from './dto';
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get('available')
  getAvailableDoctors() {
    return this.doctorService.getAvailableDoctors();
  }

  @Get(':id')
  getDoctorName(@Param('id') ProfileID: string) {
    return this.doctorService.getDoctorName(+ProfileID);
  }

  @Get('name/:name')
  getDoctorId(@Param('name') Name: string) {
    // console.log('getDoctorId controller name: ', Name);
    return this.doctorService.getDoctorId(Name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDoctorDto) {
    // console.log('controller dto: ', dto);
    return this.doctorService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}
