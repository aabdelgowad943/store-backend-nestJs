import { HttpStatus } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class VoucherService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createVoucherDto: CreateVoucherDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            sellerId: string;
            bookId: string;
            code: string;
            discount: number;
            expiration: Date;
            usedCount: number;
            isActive: boolean;
        };
        statusCode: HttpStatus;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            sellerId: string;
            bookId: string;
            code: string;
            discount: number;
            expiration: Date;
            usedCount: number;
            isActive: boolean;
        }[];
        statusCode: HttpStatus;
    }>;
    getVoucherBySellerId(sellerId: string): Promise<{
        success: boolean;
        message: string;
        data: any[];
        statusCode: number;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            sellerId: string;
            bookId: string;
            code: string;
            discount: number;
            expiration: Date;
            usedCount: number;
            isActive: boolean;
        };
        statusCode: HttpStatus;
    }>;
    update(id: string, updateVoucherDto: UpdateVoucherDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            sellerId: string;
            bookId: string;
            code: string;
            discount: number;
            expiration: Date;
            usedCount: number;
            isActive: boolean;
        };
        statusCode: HttpStatus;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        statusCode: HttpStatus;
    }>;
}
