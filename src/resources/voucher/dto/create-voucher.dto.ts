import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  Min,
  Max,
} from 'class-validator';

export class CreateVoucherDto {
  @ApiProperty({
    description: 'Code of the voucher',
    example: 'Code123pdf',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Enter the discount amount',
    example: 0.2, // Assuming discount is a fraction
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1) // Assuming discount is between 0 and 1
  discount: number;

  @ApiProperty({
    description: 'The title of the book',
    example: '11 / 2 / 2024',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date) // Transform input into a Date object
  expiration: Date;

  @ApiProperty({
    description: 'Enter book id',
    example: '1bb',
  })
  @IsNotEmpty()
  @IsString()
  bookId: string;

  @ApiProperty({
    description: 'Enter seller id',
    example: '1ss',
  })
  @IsNotEmpty()
  @IsString()
  sellerId: string;
}
