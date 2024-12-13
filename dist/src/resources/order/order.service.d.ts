import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Order } from '@prisma/client';
export declare class OrderService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<{
        success: boolean;
        message: string;
        data?: Order;
        statusCode: number;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: Order[];
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
