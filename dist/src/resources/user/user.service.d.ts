import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        success: boolean;
        message: string;
        data?: User;
        statusCode: number;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: User[];
        statusCode: number;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: User | null;
        statusCode: number;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        success: boolean;
        message: string;
        data: User | null;
        statusCode: number;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        data: null;
        statusCode: number;
    }>;
    private hashPassword;
}
