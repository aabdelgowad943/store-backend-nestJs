import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  IsStrongPassword,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class Register {
  @ApiProperty({
    description: 'username',
    example: 'ahmedmamdouh14',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  username: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'StrongP@ssw0rd',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
