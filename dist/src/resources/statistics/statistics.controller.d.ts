import { StatisticsService } from './statistics.service';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { CreateStatisticsDto } from './dto/create-statistic.dto';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
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
        statusCode: import("@nestjs/common").HttpStatus;
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
            sellerId: string;
            totalSales: number;
            totalEarnings: number;
            topSellingBookId: string | null;
            totalVouchersCreated: number;
            totalVouchersUsed: number;
        };
        statusCode: import("@nestjs/common").HttpStatus;
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
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
}
