import { AuthService } from './auth.service';
import { Register } from './dto/register.dto';
import { Login } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: Register): Promise<{
        success: boolean;
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    login(loginDto: Login): Promise<{
        success: boolean;
        token: string;
        role: import(".prisma/client").$Enums.Role;
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
        sellerId: string;
        id: string;
        username: string;
        email: string;
    }>;
}
