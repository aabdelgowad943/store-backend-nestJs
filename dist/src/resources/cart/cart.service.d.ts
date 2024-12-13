import { PrismaService } from 'prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
export declare class CartService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCartDto: CreateCartDto): Promise<{
        success: boolean;
        message: string;
        data?: Cart;
        statusCode: number;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: any[];
        statusCode: number;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: Cart | null;
        statusCode: number;
    }>;
    getCartByUserId(userId: string): Promise<{
        success: boolean;
        message: string;
        data: any[];
        statusCode: number;
    }>;
    update(id: string, updateCartDto: UpdateCartDto): Promise<{
        success: boolean;
        message: string;
        data: Cart | null;
        statusCode: number;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        data: null;
        statusCode: number;
    }>;
}
