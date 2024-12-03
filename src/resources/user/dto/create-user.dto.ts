// src/users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
// import { Role } from '@prisma/client';
import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { Role } from 'src/auth/roles.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'The unique username of the user',
    example: 'amamdouh14',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'ahmedmamdouh14@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'StrongP@ssw0rd',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    example: 'BUYER',
  })
  @IsEnum(Role, {
    message: 'Role must be one of BUYER, SELLER, ADMIN',
  })
  @IsNotEmpty()
  role: Role;

  @ApiProperty({
    description: 'Image url',
    example:
      'https://images.pexels.com/photos/5234256/pexels-photo-5234256.jpeg?auto=compress&cs=tinysrgb&w=600',
  })
  @IsString()
  @IsNotEmpty()
  profileImage: string;
}
