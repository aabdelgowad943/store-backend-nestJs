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
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const mongodb_1 = require("mongodb");
let BookService = class BookService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBookDto) {
        try {
            if (!mongodb_1.ObjectId.isValid(createBookDto.sellerId)) {
                throw new common_1.HttpException('Invalid seller ID format', common_1.HttpStatus.BAD_REQUEST);
            }
            const sellerExists = await this.prisma.user.findUnique({
                where: { id: createBookDto.sellerId },
            });
            if (!sellerExists) {
                throw new common_1.HttpException('Seller does not exist', common_1.HttpStatus.BAD_REQUEST);
            }
            const newBook = await this.prisma.book.create({
                data: {
                    title: createBookDto.title,
                    description: createBookDto.description,
                    price: Number(createBookDto.price),
                    author: createBookDto.author,
                    fileUrl: createBookDto.fileUrl,
                    isFeatured: createBookDto.isFeatured,
                    seller: {
                        connect: { id: createBookDto.sellerId },
                    },
                },
            });
            return {
                success: true,
                message: 'Book created successfully',
                data: newBook,
                statusCode: common_1.HttpStatus.CREATED,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to create book', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            const books = await this.prisma.book.findMany();
            return {
                success: true,
                message: 'Books retrieved successfully',
                data: books,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to retrieve books', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findBySellerId(sellerId) {
        try {
            if (!mongodb_1.ObjectId.isValid(sellerId)) {
                throw new common_1.HttpException('Invalid seller ID format', common_1.HttpStatus.BAD_REQUEST);
            }
            const books = await this.prisma.book.findMany({
                where: {
                    sellerId: sellerId,
                },
            });
            return {
                success: true,
                message: 'Books retrieved successfully',
                data: books,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to retrieve books', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const book = await this.prisma.book.findUnique({
                where: { id },
                include: {
                    seller: true,
                    vouchers: true,
                },
            });
            if (!book) {
                return {
                    success: false,
                    message: `Book with ID #${id} not found`,
                    data: null,
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            return {
                success: true,
                message: `Book with ID #${id} retrieved successfully`,
                data: book,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to retrieve book', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateBookDto) {
        try {
            const book = await this.prisma.book.findUnique({ where: { id } });
            if (!book) {
                return {
                    success: false,
                    message: `Book with ID #${id} not found`,
                    data: null,
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            const updatedBookData = {};
            if (updateBookDto.title)
                updatedBookData.title = updateBookDto.title;
            if (updateBookDto.description)
                updatedBookData.description = updateBookDto.description;
            if (updateBookDto.author)
                updatedBookData.author = updateBookDto.author;
            if (updateBookDto.fileUrl)
                updatedBookData.fileUrl = updateBookDto.fileUrl;
            if (updateBookDto.price !== undefined) {
                updatedBookData.price = Number(updateBookDto.price);
            }
            if (updateBookDto.sellerId)
                updatedBookData.sellerId = updateBookDto.sellerId;
            updatedBookData.updatedAt = new Date();
            const updatedBook = await this.prisma.book.update({
                where: { id },
                data: updatedBookData,
            });
            return {
                success: true,
                message: `Book with ID #${id} updated successfully`,
                data: updatedBook,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to update book', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const book = await this.prisma.book.findUnique({ where: { id } });
            if (!book) {
                return {
                    success: false,
                    message: `Book with ID #${id} not found`,
                    data: null,
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            await this.prisma.book.delete({ where: { id } });
            return {
                success: true,
                message: `Book with ID #${id} removed successfully`,
                data: null,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to delete book', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async searchBooks(query) {
        try {
            const books = await this.prisma.book.findMany({
                where: {
                    OR: [
                        {
                            title: {
                                contains: query,
                                mode: 'insensitive',
                            },
                        },
                        {
                            author: {
                                contains: query,
                                mode: 'insensitive',
                            },
                        },
                    ],
                },
            });
            return {
                success: true,
                message: `Books found for query: ${query}`,
                data: books,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to search books', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookService);
//# sourceMappingURL=book.service.js.map