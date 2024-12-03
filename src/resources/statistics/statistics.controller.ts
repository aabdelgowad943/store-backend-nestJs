import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { CreateStatisticsDto } from './dto/create-statistic.dto';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Post()
  create(@Body() createStatisticDto: CreateStatisticsDto) {
    return this.statisticsService.create(createStatisticDto);
  }

  @Get()
  findAll() {
    return this.statisticsService.findAll();
  }

  @Get('sellerId')
  async findBySellerId(@Query('sellerId') sellerId: string) {
    return await this.statisticsService.getStatisticsBySellerId(sellerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statisticsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStatisticDto: UpdateStatisticDto,
  ) {
    return this.statisticsService.update(id, updateStatisticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statisticsService.remove(id);
  }
}
