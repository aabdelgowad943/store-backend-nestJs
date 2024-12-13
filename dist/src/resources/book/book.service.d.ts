import { HttpStatus } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Book } from './entities/book.entity';
export declare class BookService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createBookDto: CreateBookDto): Promise<{
        success: boolean;
        message: string;
        data?: Book;
        statusCode: number;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: any[];
        statusCode: number;
    }>;
    findBySellerId(sellerId: string): Promise<{
        success: boolean;
        message: string;
        data: any[];
        statusCode: number;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: any | null;
        statusCode: number;
    }>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<{
        success: boolean;
        message: string;
        data: any | null;
        statusCode: number;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        data: null;
        statusCode: number;
    }>;
    searchBooks(query: string): Promise<{
        success: boolean;
        message: string;
        data: {
            description: string;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            author: string;
            fileUrl: string;
            sellerId: string;
            isFeatured: boolean | null;
        }[];
        statusCode: HttpStatus;
    }>;
}
