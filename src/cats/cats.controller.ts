import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards, UseInterceptors
} from "@nestjs/common";
import { CreateCatDto } from '../dto/create-cat.dto';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { ListAllEntities } from '../dto/list-all-entities';
import { Cat } from '../interfaces/cat.interface';
import { CatsService } from './cats.service';
import { ForbiddenException } from '../exception/forbidden.exception';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../decorator/roles.decorator';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';

@Controller('cats')
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get(':id')
  @UseGuards(RolesGuard)
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): string {
    return this.catsService.findOne(id);
  }

  @Post()
  @UseFilters(new HttpExceptionFilter())
  @Roles('admin')
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
