import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Book } from './entities/book.entity';
import { ObjectId } from 'mongodb'; // Import the ObjectId validation from the mongodb package

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  // ----------------------------------------------------------------------------------------------------------
  // CREATE / Add a new book
  async create(createBookDto: CreateBookDto): Promise<{
    success: boolean;
    message: string;
    data?: Book;
    statusCode: number;
  }> {
    try {
      // Validate sellerId format before querying
      if (!ObjectId.isValid(createBookDto.sellerId)) {
        throw new HttpException(
          'Invalid seller ID format',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Validate that the seller exists
      const sellerExists = await this.prisma.user.findUnique({
        where: { id: createBookDto.sellerId },
      });

      if (!sellerExists) {
        throw new HttpException(
          'Seller does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Create the book
      const newBook = await this.prisma.book.create({
        data: {
          title: createBookDto.title,
          description: createBookDto.description,
          price: Number(createBookDto.price),
          author: createBookDto.author,
          fileUrl: createBookDto.fileUrl,
          isFeatured: createBookDto.isFeatured,
          seller: {
            connect: { id: createBookDto.sellerId },
          },
        },
      });

      return {
        success: true,
        message: 'Book created successfully',
        data: newBook,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create book',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ----------------------------------------------------------------------------------------------------------
  // GET / Retrieve all books
  async findAll(): Promise<{
    success: boolean;
    message: string;
    data: any[];
    statusCode: number;
  }> {
    try {
      const books = await this.prisma.book.findMany();
      return {
        success: true,
        message: 'Books retrieved successfully',
        data: books,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve books',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ----------------------------------------------------------------------------------------------------------
  // GET / Retrieve all books for a specific seller
  async findBySellerId(sellerId: string): Promise<{
    success: boolean;
    message: string;
    data: any[];
    statusCode: number;
  }> {
    try {
      // Validate the sellerId
      if (!ObjectId.isValid(sellerId)) {
        throw new HttpException(
          'Invalid seller ID format',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Retrieve books for the specific seller
      const books = await this.prisma.book.findMany({
        where: {
          sellerId: sellerId, // Filter books by sellerId
        },
      });

      return {
        success: true,
        message: 'Books retrieved successfully',
        data: books,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve books',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ----------------------------------------------------------------------------------------------------------
  // GET / Retrieve a book by ID
  async findOne(id: string): Promise<{
    success: boolean;
    message: string;
    data: any | null;
    statusCode: number;
  }> {
    try {
      const book = await this.prisma.book.findUnique({
        where: { id },
        include: {
          seller: true,
          vouchers: true, // Include the seller relation
        },
      });

      if (!book) {
        return {
          success: false,
          message: `Book with ID #${id} not found`,
          data: null,
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        success: true,
        message: `Book with ID #${id} retrieved successfully`,
        data: book,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve book',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ----------------------------------------------------------------------------------------------------------
  // UPDATE / Update a book by ID
  // UPDATE / Update a book by ID
  async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<{
    success: boolean;
    message: string;
    data: any | null;
    statusCode: number;
  }> {
    try {
      const book = await this.prisma.book.findUnique({ where: { id } });

      if (!book) {
        return {
          success: false,
          message: `Book with ID #${id} not found`,
          data: null,
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      // Only include fields that are not undefined
      const updatedBookData: any = {};

      if (updateBookDto.title) updatedBookData.title = updateBookDto.title;
      if (updateBookDto.description)
        updatedBookData.description = updateBookDto.description;
      if (updateBookDto.author) updatedBookData.author = updateBookDto.author;
      if (updateBookDto.fileUrl)
        updatedBookData.fileUrl = updateBookDto.fileUrl;

      // Ensure price is a number and only add it if provided
      if (updateBookDto.price !== undefined) {
        updatedBookData.price = Number(updateBookDto.price); // Ensure it's a number
      }

      if (updateBookDto.sellerId)
        updatedBookData.sellerId = updateBookDto.sellerId;

      updatedBookData.updatedAt = new Date(); // Always update the timestamp

      // Update the book with the provided fields
      const updatedBook = await this.prisma.book.update({
        where: { id },
        data: updatedBookData,
      });

      return {
        success: true,
        message: `Book with ID #${id} updated successfully`,
        data: updatedBook,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update book',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ----------------------------------------------------------------------------------------------------------
  // DELETE / Remove a book by ID
  async remove(id: string): Promise<{
    success: boolean;
    message: string;
    data: null;
    statusCode: number;
  }> {
    try {
      const book = await this.prisma.book.findUnique({ where: { id } });

      if (!book) {
        return {
          success: false,
          message: `Book with ID #${id} not found`,
          data: null,
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      await this.prisma.book.delete({ where: { id } });

      return {
        success: true,
        message: `Book with ID #${id} removed successfully`,
        data: null,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete book',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // ------------------------------------------------------------------------------

  async searchBooks(query: string) {
    // console.log('sss');
    try {
      const books = await this.prisma.book.findMany({
        where: {
          OR: [
            {
              title: {
                contains: query,
                mode: 'insensitive', // Case-insensitive search
              },
            },
            {
              author: {
                contains: query,
                mode: 'insensitive', // Case-insensitive search
              },
            },
          ],
        },
      });
      return {
        success: true,
        message: `Books found for query: ${query}`,
        data: books,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to search books',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
