import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): Promise<{
        success: boolean;
        message: string;
        data?: import(".prisma/client").Order;
        statusCode: number;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: import(".prisma/client").Order[];
        statusCode: number;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            buyerId: string;
            bookId: string;
            amount: number;
            status: string;
        };
        statusCode: number;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            buyerId: string;
            bookId: string;
            amount: number;
            status: string;
        };
        statusCode: number;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            buyerId: string;
            bookId: string;
            amount: number;
            status: string;
        };
        statusCode: number;
    }>;
}
