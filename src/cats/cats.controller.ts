import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode, HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res, UseFilters
} from "@nestjs/common";
import { CreateCatDto } from '../dto/create-cat.dto';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { ListAllEntities } from '../dto/list-all-entities';
import { Cat } from '../interfaces/cat.interface';
import { CatsService } from './cats.service';
import { ForbiddenException } from '../exception/forbidden.exception';
import { HttpExceptionFilter } from "../filter/http-exception.filter";

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This Action returns a #${params.id} cat`;
  }

  @Post()
  @UseFilters(new HttpExceptionFilter())
  @Header('Cache-Control', 'none')
  async create(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException();
    // this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(@Query() query: ListAllEntities): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This Action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }

  @Get('error')
  findException() {
    throw new ForbiddenException();
  }
}
