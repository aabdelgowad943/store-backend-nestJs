import { HttpStatus } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    create(createBookDto: CreateBookDto): Promise<{
        success: boolean;
        message: string;
        data?: import("./entities/book.entity").Book;
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
    searchBooks(query: string): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
        statusCode: HttpStatus;
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
}
