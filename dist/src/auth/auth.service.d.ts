import { HttpStatus, LoggerService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { Register } from './dto/register.dto';
import { Login } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    private readonly logger;
    constructor(prisma: PrismaService, jwt: JwtService, logger: LoggerService);
    register(registerDto: Register): Promise<{
        success: boolean;
        message: string;
        statusCode: HttpStatus;
    }>;
    login(loginDto: Login): Promise<{
        success: boolean;
        token: string;
        role: import(".prisma/client").$Enums.Role;
        message: string;
        statusCode: HttpStatus;
        sellerId: string;
        id: string;
        username: string;
        email: string;
    }>;
    private hashPassword;
    private comparePassword;
}
