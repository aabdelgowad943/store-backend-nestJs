"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const mongodb_1 = require("mongodb");
let StatisticsService = class StatisticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createStatisticDto) {
        const { sellerId, totalSales, totalEarnings, topSellingBookId, totalVouchersCreated, totalVouchersUsed, } = createStatisticDto;
        try {
            const sellerExists = await this.prisma.user.findUnique({
                where: { id: sellerId },
            });
            if (!sellerExists) {
                throw new common_1.HttpException('Seller does not exist', common_1.HttpStatus.BAD_REQUEST);
            }
            const newStatistic = await this.prisma.statistics.create({
                data: {
                    sellerId,
                    totalSales,
                    totalEarnings,
                    topSellingBookId,
                    totalVouchersCreated,
                    totalVouchersUsed,
                },
            });
            return {
                success: true,
                message: 'Statistic created successfully',
                data: newStatistic,
                statusCode: common_1.HttpStatus.CREATED,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to create statistic', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            const statistics = await this.prisma.statistics.findMany();
            return {
                success: true,
                message: 'Statistics retrieved successfully',
                data: statistics,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to retrieve statistics', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getStatisticsBySellerId(sellerId) {
        try {
            if (!mongodb_1.ObjectId.isValid(sellerId)) {
                throw new common_1.HttpException('Invalid seller ID format', common_1.HttpStatus.BAD_REQUEST);
            }
            const statistics = await this.prisma.statistics.findMany({
                where: {
                    sellerId: sellerId,
                },
            });
            return {
                success: true,
                message: 'Statistics retrieved successfully',
                data: statistics,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to retrieve statistics', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const statistic = await this.prisma.statistics.findUnique({
                where: { id },
            });
            if (!statistic) {
                throw new common_1.HttpException('Statistic not found', common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: true,
                message: 'Statistic retrieved successfully',
                data: statistic,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to retrieve statistic', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateStatisticDto) {
        try {
            const existingStatistic = await this.prisma.statistics.findUnique({
                where: { id },
            });
            if (!existingStatistic) {
                throw new common_1.HttpException('Statistic not found', common_1.HttpStatus.NOT_FOUND);
            }
            const updatedStatistic = await this.prisma.statistics.update({
                where: { id },
                data: updateStatisticDto,
            });
            return {
                success: true,
                message: 'Statistic updated successfully',
                data: updatedStatistic,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to update statistic', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const existingStatistic = await this.prisma.statistics.findUnique({
                where: { id },
            });
            if (!existingStatistic) {
                throw new common_1.HttpException('Statistic not found', common_1.HttpStatus.NOT_FOUND);
            }
            await this.prisma.statistics.delete({
                where: { id },
            });
            return {
                success: true,
                message: 'Statistic removed successfully',
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to remove statistic', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map