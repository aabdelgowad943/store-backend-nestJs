import {
  ConflictException,
  Injectable,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // ----------------------------------------------------------------------------------------------------------
  // CREATE /user
  async create(createUserDto: CreateUserDto): Promise<{
    success: boolean;
    message: string;
    data?: User;
    statusCode: number;
  }> {
    try {
      const { email, username, password, profileImage } = createUserDto;

      if (!email || !password) {
        throw new BadRequestException('Email and password are required');
      }

      // Check for existing user by email or username
      const existingUser = await this.prisma.user.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });

      if (existingUser) {
        if (existingUser.email === email) {
          throw new ConflictException('Email already exists');
        }
        if (existingUser.username === username) {
          throw new ConflictException('Username already exists');
        }
      }

      // Hash the password
      const hashedPassword = await this.hashPassword(password);

      // Create user
      const newUser = await this.prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role: 'SELLER',
          profileImage,
        },
      });

      return {
        success: true,
        message: 'User created successfully',
        data: newUser,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to create user',
        statusCode: HttpStatus.CONFLICT,
      };
    }
  }

  // ----------------------------------------------------------------------------------------------------------
  // GET /users
  async findAll(): Promise<{
    success: boolean;
    message: string;
    data: User[];
    statusCode: number;
  }> {
    try {
      const users = await this.prisma.user.findMany();

      return {
        success: true,
        message: 'Users retrieved successfully',
        data: users,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve users',
        data: [],
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  // ----------------------------------------------------------------------------------------------------------
  // GET /user by id
  async findOne(id: string): Promise<{
    success: boolean;
    message: string;
    data: User | null;
    statusCode: number;
  }> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return {
        success: false,
        message: `User with ID #${id} not found`,
        data: null,
        statusCode: HttpStatus.NOT_FOUND,
      };
    }

    return {
      success: true,
      message: `User with ID #${id} retrieved successfully`,
      data: user,
      statusCode: HttpStatus.OK,
    };
  }

  // ----------------------------------------------------------------------------------------------------------
  // UPDATE /user by id
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{
    success: boolean;
    message: string;
    data: User | null;
    statusCode: number;
  }> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return {
          success: false,
          message: `User with ID #${id} not found`,
          data: null,
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          ...updateUserDto,
          updatedAt: new Date(),
        },
      });

      return {
        success: true,
        message: `User with ID #${id} updated successfully`,
        data: updatedUser,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update user',
        data: null,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  // ----------------------------------------------------------------------------------------------------------
  // REMOVE /user by id
  async remove(id: string): Promise<{
    success: boolean;
    message: string;
    data: null;
    statusCode: number;
  }> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return {
          success: false,
          message: `User with ID #${id} not found`,
          data: null,
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      await this.prisma.user.delete({
        where: { id },
      });

      return {
        success: true,
        message: `User with ID #${id} removed successfully`,
        data: null,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to remove user',
        data: null,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  // private async comparePassword(password: string, hash: string) {
  //   return bcrypt.compare(password, hash);
  // }
}
