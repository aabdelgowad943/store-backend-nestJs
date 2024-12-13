import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    create(createCartDto: CreateCartDto): Promise<{
        success: boolean;
        message: string;
        data?: import("./entities/cart.entity").Cart;
        statusCode: number;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: any[];
        statusCode: number;
    }>;
    getCartByUserId(userId: string): Promise<{
        success: boolean;
        message: string;
        data: any[];
        statusCode: number;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/cart.entity").Cart | null;
        statusCode: number;
    }>;
    update(id: string, updateCartDto: UpdateCartDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/cart.entity").Cart | null;
        statusCode: number;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        data: null;
        statusCode: number;
    }>;
}
