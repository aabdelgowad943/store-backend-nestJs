import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateStatisticsDto {
  @ApiProperty({
    description: 'Seller ID',
    example: '60d5f8e6b8f22b6f218ebae4',
  })
  @IsNotEmpty()
  @IsString()
  sellerId: string;

  @ApiProperty({ description: 'Total sales of the seller', example: 150 })
  @IsNotEmpty()
  @IsNumber()
  totalSales: number;

  @ApiProperty({ description: 'Total earnings of the seller', example: 2500.5 })
  @IsNotEmpty()
  @IsNumber()
  totalEarnings: number;

  @ApiProperty({
    description: 'Top selling book ID (optional)',
    example: '60d5f8e6b8f22b6f218ebae5',
    required: false,
  })
  @IsOptional()
  @IsString()
  topSellingBookId?: string;

  @ApiProperty({
    description: 'Total vouchers created by the seller',
    example: 30,
  })
  @IsNotEmpty()
  @IsNumber()
  totalVouchersCreated: number;

  @ApiProperty({
    description: 'Total vouchers used by the seller',
    example: 25,
  })
  @IsNotEmpty()
  @IsNumber()
  totalVouchersUsed: number;
}
