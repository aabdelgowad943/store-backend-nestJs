import { HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateStatisticsDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
export declare class StatisticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createStatisticDto: CreateStatisticsDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            sellerId: string;
            totalSales: number;
            totalEarnings: number;
            topSellingBookId: string | null;
            totalVouchersCreated: number;
            totalVouchersUsed: number;
        };
        statusCode: HttpStatus;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            sellerId: string;
            totalSales: number;
            totalEarnings: number;
            topSellingBookId: string | null;
            totalVouchersCreated: number;
            totalVouchersUsed: number;
        }[];
        statusCode: HttpStatus;
    }>;
    getStatisticsBySellerId(sellerId: string): Promise<{
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
            sellerId: string;
            totalSales: number;
            totalEarnings: number;
            topSellingBookId: string | null;
            totalVouchersCreated: number;
            totalVouchersUsed: number;
        };
        statusCode: HttpStatus;
    }>;
    update(id: string, updateStatisticDto: UpdateStatisticDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            sellerId: string;
            totalSales: number;
            totalEarnings: number;
            topSellingBookId: string | null;
            totalVouchersCreated: number;
            totalVouchersUsed: number;
        };
        statusCode: HttpStatus;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        statusCode: HttpStatus;
    }>;
}
