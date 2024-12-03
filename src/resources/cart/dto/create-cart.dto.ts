import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({
    description: 'The ID of the user adding the product to the cart',
    example: '603d9b56e7d7fc3b5a3e2b99',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The ID of the book being added to the cart',
    example: '603d9b56e7d7fc3b5a3e2b88',
  })
  @IsString()
  @IsNotEmpty()
  bookId: string;

  @ApiProperty({
    description: 'The quantity of the book being added to the cart',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
