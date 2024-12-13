import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
export declare class VoucherController {
    private readonly voucherService;
    constructor(voucherService: VoucherService);
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
        statusCode: import("@nestjs/common").HttpStatus;
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
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    findBySellerId(sellerId: string): Promise<{
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
        statusCode: import("@nestjs/common").HttpStatus;
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
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
}
