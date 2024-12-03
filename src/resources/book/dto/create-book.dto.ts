// src/books/dto/create-book.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUrl,
  IsBoolean,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'The title of the book',
    example: 'The Future',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Describe the book',
    example: 'it is talk about travel to the future',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Enter the book price',
    example: 250,
  })
  @IsNotEmpty()
  @IsNumber()
  price: string;

  @ApiProperty({
    description: 'The writer of the book',
    example: 'Ahmed Khaled Tawfik',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: 'Insert the image of the book',
    example: 'https://google.image/300*300',
  })
  @IsUrl()
  @IsNotEmpty()
  fileUrl: string;

  @ApiProperty({
    description: 'Seller id',
    example: '1ss',
  })
  @IsString()
  @IsNotEmpty()
  sellerId: string;

  @ApiProperty({
    description: 'Book status',
    example: true,
  })
  @IsBoolean()
  isFeatured?: boolean;
}
