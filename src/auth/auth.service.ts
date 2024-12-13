import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Register } from './dto/register.dto';
import { Login } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async register(registerDto: Register) {
    try {
      const { name, email, password, username } = registerDto;

      // Check if email or username already exists
      const [foundEmail, foundUsername] = await Promise.all([
        this.prisma.user.findUnique({ where: { email } }),
        this.prisma.user.findUnique({ where: { username } }),
      ]);

      if (foundEmail) {
        throw new ConflictException('Email already exists');
      }

      if (foundUsername) {
        throw new ConflictException('Username already exists');
      }

      // Hash the password
      const hashedPassword = await this.hashPassword(password);

      // Create a new user
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          username,
          role: 'BUYER', // Default role
        },
      });

      if (!user) {
        throw new InternalServerErrorException('Failed to create user');
      }

      return {
        success: true,
        message: 'Successfully registered',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      this.logger.error('Error during user registration', {
        message: error.message,
        stack: error.stack,
      });
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginDto: Login) {
    try {
      const { email, password } = loginDto;

      // Find user by email
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      // Validate password
      const isMatch = await this.comparePassword(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid email or password!!');
      }

      // Generate JWT token
      const tokenPayload = { id: user.id, role: user.role };
      const token = this.jwt.sign(tokenPayload, {
        secret: 'ss', // Replace with your actual secret
        expiresIn: '1h',
      });

      // Update user's token in database
      await this.prisma.user.update({
        where: { id: user.id },
        data: { token },
      });

      return {
        success: true,
        token: `Bearer ${token}`,
        role: user.role,
        message: 'Successfully logged in',
        statusCode: HttpStatus.OK,
        sellerId: user.role === 'SELLER' ? user.id : null,
        id: user.id,
        username: user.username,
        email: user.email,
      };
    } catch (error) {
      this.logger.error('Error during login', {
        message: error.message,
        stack: error.stack,
      });
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // hello

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  private async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
