import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        success: boolean;
        message: string;
        data?: import(".prisma/client").User;
        statusCode: number;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: import(".prisma/client").User[];
        statusCode: number;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: import(".prisma/client").User | null;
        statusCode: number;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        success: boolean;
        message: string;
        data: import(".prisma/client").User | null;
        statusCode: number;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        data: null;
        statusCode: number;
    }>;
}
