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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const mongodb_1 = require("mongodb");
let CartService = class CartService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCartDto) {
        try {
            const { userId, bookId, quantity } = createCartDto;
            if (!userId || !bookId || !quantity) {
                throw new common_1.BadRequestException('User ID, Book ID, and quantity are required');
            }
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.ConflictException('User not found');
            }
            const book = await this.prisma.book.findUnique({
                where: { id: bookId },
            });
            if (!book) {
                throw new common_1.ConflictException('Book not found');
            }
            const existingCart = await this.prisma.cart.findUnique({
                where: { userId_bookId: { userId, bookId } },
            });
            if (existingCart) {
                throw new common_1.ConflictException('This book is already in the cart');
            }
            const newCart = await this.prisma.cart.create({
                data: {
                    userId,
                    bookId,
                    quantity,
                },
            });
            return {
                success: true,
                message: 'Cart created successfully',
                data: newCart,
                statusCode: common_1.HttpStatus.CREATED,
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to create cart',
                statusCode: common_1.HttpStatus.CONFLICT,
            };
        }
    }
    async findAll() {
        try {
            const carts = await this.prisma.cart.findMany({
                include: {
                    book: true,
                },
            });
            return {
                success: true,
                message: 'Carts retrieved successfully',
                data: carts,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to retrieve carts',
                data: [],
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async findOne(id) {
        const cart = await this.prisma.cart.findUnique({
            where: { id },
        });
        if (!cart) {
            return {
                success: false,
                message: `Cart with ID #${id} not found`,
                data: null,
                statusCode: common_1.HttpStatus.NOT_FOUND,
            };
        }
        return {
            success: true,
            message: `Cart with ID #${id} retrieved successfully`,
            data: cart,
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async getCartByUserId(userId) {
        try {
            if (!mongodb_1.ObjectId.isValid(userId)) {
                throw new common_1.HttpException('Invalid user ID format', common_1.HttpStatus.BAD_REQUEST);
            }
            const cartItems = await this.prisma.cart.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    book: true,
                },
            });
            return {
                success: true,
                message: 'Cart items retrieved successfully',
                data: cartItems,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to retrieve cart items', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateCartDto) {
        try {
            const cart = await this.prisma.cart.findUnique({
                where: { id },
            });
            if (!cart) {
                return {
                    success: false,
                    message: `Cart with ID #${id} not found`,
                    data: null,
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            const updatedCart = await this.prisma.cart.update({
                where: { id },
                data: {
                    ...updateCartDto,
                    updatedAt: new Date(),
                },
            });
            return {
                success: true,
                message: `Cart with ID #${id} updated successfully`,
                data: updatedCart,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to update cart',
                data: null,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async remove(id) {
        try {
            const cart = await this.prisma.cart.findUnique({
                where: { id },
            });
            if (!cart) {
                return {
                    success: false,
                    message: `Cart with ID #${id} not found`,
                    data: null,
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            await this.prisma.cart.delete({
                where: { id },
            });
            return {
                success: true,
                message: `Cart with ID #${id} removed successfully`,
                data: null,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to remove cart',
                data: null,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map