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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        try {
            const { email, username, password, profileImage } = createUserDto;
            if (!email || !password) {
                throw new common_1.BadRequestException('Email and password are required');
            }
            const existingUser = await this.prisma.user.findFirst({
                where: {
                    OR: [{ email }, { username }],
                },
            });
            if (existingUser) {
                if (existingUser.email === email) {
                    throw new common_1.ConflictException('Email already exists');
                }
                if (existingUser.username === username) {
                    throw new common_1.ConflictException('Username already exists');
                }
            }
            const hashedPassword = await this.hashPassword(password);
            const newUser = await this.prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                    role: 'SELLER',
                    profileImage,
                },
            });
            return {
                success: true,
                message: 'User created successfully',
                data: newUser,
                statusCode: common_1.HttpStatus.CREATED,
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to create user',
                statusCode: common_1.HttpStatus.CONFLICT,
            };
        }
    }
    async findAll() {
        try {
            const users = await this.prisma.user.findMany();
            return {
                success: true,
                message: 'Users retrieved successfully',
                data: users,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to retrieve users',
                data: [],
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            return {
                success: false,
                message: `User with ID #${id} not found`,
                data: null,
                statusCode: common_1.HttpStatus.NOT_FOUND,
            };
        }
        return {
            success: true,
            message: `User with ID #${id} retrieved successfully`,
            data: user,
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async update(id, updateUserDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                return {
                    success: false,
                    message: `User with ID #${id} not found`,
                    data: null,
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            const updatedUser = await this.prisma.user.update({
                where: { id },
                data: {
                    ...updateUserDto,
                    updatedAt: new Date(),
                },
            });
            return {
                success: true,
                message: `User with ID #${id} updated successfully`,
                data: updatedUser,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to update user',
                data: null,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async remove(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                return {
                    success: false,
                    message: `User with ID #${id} not found`,
                    data: null,
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                };
            }
            await this.prisma.user.delete({
                where: { id },
            });
            return {
                success: true,
                message: `User with ID #${id} removed successfully`,
                data: null,
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to remove user',
                data: null,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map