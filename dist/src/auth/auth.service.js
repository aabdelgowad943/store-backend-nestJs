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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../../prisma/prisma.service");
const nest_winston_1 = require("nest-winston");
let AuthService = class AuthService {
    constructor(prisma, jwt, logger) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.logger = logger;
    }
    async register(registerDto) {
        try {
            const { name, email, password, username } = registerDto;
            const [foundEmail, foundUsername] = await Promise.all([
                this.prisma.user.findUnique({ where: { email } }),
                this.prisma.user.findUnique({ where: { username } }),
            ]);
            if (foundEmail) {
                throw new common_1.ConflictException('Email already exists');
            }
            if (foundUsername) {
                throw new common_1.ConflictException('Username already exists');
            }
            const hashedPassword = await this.hashPassword(password);
            const user = await this.prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    username,
                    role: 'BUYER',
                },
            });
            if (!user) {
                throw new common_1.InternalServerErrorException('Failed to create user');
            }
            return {
                success: true,
                message: 'Successfully registered',
                statusCode: common_1.HttpStatus.CREATED,
            };
        }
        catch (error) {
            this.logger.error('Error during user registration', {
                message: error.message,
                stack: error.stack,
            });
            throw new common_1.HttpException(error.message || 'Internal Server Error', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(loginDto) {
        try {
            const { email, password } = loginDto;
            const user = await this.prisma.user.findUnique({ where: { email } });
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid email or password');
            }
            const isMatch = await this.comparePassword(password, user.password);
            if (!isMatch) {
                throw new common_1.UnauthorizedException('Invalid email or password!!');
            }
            const tokenPayload = { id: user.id, role: user.role };
            const token = this.jwt.sign(tokenPayload, {
                secret: 'ss',
                expiresIn: '1h',
            });
            await this.prisma.user.update({
                where: { id: user.id },
                data: { token },
            });
            return {
                success: true,
                token: `Bearer ${token}`,
                role: user.role,
                message: 'Successfully logged in',
                statusCode: common_1.HttpStatus.OK,
                sellerId: user.role === 'SELLER' ? user.id : null,
                id: user.id,
                username: user.username,
                email: user.email,
            };
        }
        catch (error) {
            this.logger.error('Error during login', {
                message: error.message,
                stack: error.stack,
            });
            throw new common_1.HttpException(error.message || 'Internal Server Error', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }
    async comparePassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService, Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map