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
exports.VoucherService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const mongodb_1 = require("mongodb");
let VoucherService = class VoucherService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createVoucherDto) {
        const { bookId, sellerId, code, discount, expiration } = createVoucherDto;
        const sellerExists = await this.prisma.user.findUnique({
            where: { id: sellerId },
        });
        if (!sellerExists) {
            throw new common_1.HttpException('Invalid sellerId: User does not exist', common_1.HttpStatus.BAD_REQUEST);
        }
        const bookExists = await this.prisma.book.findUnique({
            where: { id: bookId },
        });
        if (!bookExists) {
            throw new common_1.HttpException('Invalid bookId: Book does not exist', common_1.HttpStatus.BAD_REQUEST);
        }
        if (bookExists.sellerId !== sellerId) {
            throw new common_1.HttpException('Invalid sellerId: This seller does not own the book', common_1.HttpStatus.FORBIDDEN);
        }
        const existingVoucher = await this.prisma.voucher.findUnique({
            where: { code },
        });
        if (existingVoucher) {
            throw new common_1.HttpException('Voucher code already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const newVoucher = await this.prisma.voucher.create({
            data: {
                code,
                discount,
                expiration: new Date(expiration),
                bookId,
                sellerId,
            },
        });
        return {
            success: true,
            message: 'Voucher created successfully',
            data: newVoucher,
            statusCode: common_1.HttpStatus.CREATED,
        };
    }
    async findAll() {
        const vouchers = await this.prisma.voucher.findMany();
        return {
            success: true,
            message: 'Vouchers retrieved successfully',
            data: vouchers,
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async getVoucherBySellerId(sellerId) {
        try {
            if (!mongodb_1.ObjectId.isValid(sellerId)) {
                throw new common_1.HttpException('Invalid seller ID format', common_1.HttpStatus.BAD_REQUEST);
            }
            const vouchers = await this.prisma.voucher.findMany({
                where: {
                    sellerId: sellerId,
                },
            });
            return {
                success: true,
                message: 'Vouchers retrieved successfully',
                data: vouchers,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to retrieve vouchers', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        const voucher = await this.prisma.voucher.findUnique({
            where: { id },
        });
        if (!voucher) {
            throw new common_1.NotFoundException(`Voucher with ID ${id} not found`);
        }
        return {
            success: true,
            message: 'Voucher retrieved successfully',
            data: voucher,
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async update(id, updateVoucherDto) {
        const voucher = await this.prisma.voucher.findUnique({ where: { id } });
        if (!voucher) {
            throw new common_1.NotFoundException(`Voucher with ID ${id} not found`);
        }
        const updatedVoucher = await this.prisma.voucher.update({
            where: { id },
            data: {
                ...updateVoucherDto,
            },
        });
        return {
            success: true,
            message: 'Voucher updated successfully',
            data: updatedVoucher,
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async remove(id) {
        const voucher = await this.prisma.voucher.findUnique({ where: { id } });
        if (!voucher) {
            throw new common_1.NotFoundException(`Voucher with ID ${id} not found`);
        }
        await this.prisma.voucher.delete({ where: { id } });
        return {
            success: true,
            message: 'Voucher removed successfully',
            statusCode: common_1.HttpStatus.OK,
        };
    }
};
exports.VoucherService = VoucherService;
exports.VoucherService = VoucherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VoucherService);
//# sourceMappingURL=voucher.service.js.map