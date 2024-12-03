import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The ID of the buyer (User)',
    example: '63f9fcaf4ed3b5123d1e9c9b',
  })
  @IsNotEmpty()
  @IsString()
  buyerId: string;

  @ApiProperty({
    description: 'The ID of the book being ordered',
    example: '63f9fcaf4ed3b5123d1e9c99',
  })
  @IsNotEmpty()
  @IsString()
  bookId: string;

  @ApiProperty({
    description: 'The total amount',
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0) // Ensures amount is non-negative
  amount: number;
}
