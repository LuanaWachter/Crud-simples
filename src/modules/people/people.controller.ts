import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { async } from 'rxjs';
import { PeopleDTO } from './people.dto';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  async create(@Body() {name, email, dateOfBirth}: PeopleDTO){
    return this.peopleService.create({name, email, dateOfBirth});
  }

  @Get()
  async findAll(){
    return this.peopleService.findAll();
  }

  @Put(":id")
  async update (@Param("id") id: string, @Body() data: PeopleDTO){
    return this.peopleService.update(id, data);
  }

  @Delete(":id")
  async delete(@Param("id")id: string){
    return this.peopleService.delete(id);
  }
}
