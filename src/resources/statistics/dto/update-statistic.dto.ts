import { PartialType } from '@nestjs/mapped-types';
import { CreateStatisticsDto } from './create-statistic.dto';

export class UpdateStatisticDto extends PartialType(CreateStatisticsDto) {}
