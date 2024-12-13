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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let OrderService = class OrderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOrderDto) {
        try {
            const { buyerId, bookId, amount } = createOrderDto;
            const buyer = await this.prisma.user.findUnique({
                where: { id: buyerId },
            });
            if (!buyer)
                throw new common_1.NotFoundException(`Buyer with ID ${buyerId} not found`);
            const book = await this.prisma.book.findUnique({ where: { id: bookId } });
            if (!book)
                throw new common_1.NotFoundException(`Book with ID ${bookId} not found`);
            const newOrder = await this.prisma.order.create({
                data: {
                    buyerId,
                    bookId,
                    amount,
                    status: 'PENDING',
                    updatedAt: new Date(),
                },
            });
            return {
                success: true,
                message: 'Order created successfully',
                data: newOrder,
                statusCode: 201,
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to create order',
                statusCode: 400,
            };
        }
    }
    async findAll() {
        try {
            const orders = await this.prisma.order.findMany();
            return {
                success: true,
                message: 'Orders retrieved successfully',
                data: orders,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to retrieve order',
                data: [],
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async findOne(id) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID #${id} not found`);
        }
        return {
            success: true,
            message: `Order with ID #${id} retrieved successfully`,
            data: order,
            statusCode: 200,
        };
    }
    async update(id, updateOrderDto) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID #${id} not found`);
        }
        const updatedOrder = await this.prisma.order.update({
            where: { id },
            data: {
                ...updateOrderDto,
            },
        });
        return {
            success: true,
            message: `Order with ID #${id} updated successfully`,
            data: updatedOrder,
            statusCode: 200,
        };
    }
    async remove(id) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID #${id} not found`);
        }
        const removedOrder = await this.prisma.order.delete({ where: { id } });
        return {
            success: true,
            message: `Order with ID #${id} removed successfully`,
            data: removedOrder,
            statusCode: 200,
        };
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map