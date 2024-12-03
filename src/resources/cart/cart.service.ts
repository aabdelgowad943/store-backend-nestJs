import {
  Injectable,
  ConflictException,
  HttpStatus,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  // ----------------------------------------------------------------------------------------------------------
  // CREATE /cart
  async create(createCartDto: CreateCartDto): Promise<{
    success: boolean;
    message: string;
    data?: Cart;
    statusCode: number;
  }> {
    try {
      const { userId, bookId, quantity } = createCartDto;

      if (!userId || !bookId || !quantity) {
        throw new BadRequestException(
          'User ID, Book ID, and quantity are required',
        );
      }

      // Check if user exists
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new ConflictException('User not found');
      }

      // Check if book exists
      const book = await this.prisma.book.findUnique({
        where: { id: bookId },
      });

      if (!book) {
        throw new ConflictException('Book not found');
      }

      // Check if the cart already has the book for the user
      const existingCart = await this.prisma.cart.findUnique({
        where: { userId_bookId: { userId, bookId } }, // Unique constraint based on userId and bookId
      });

      if (existingCart) {
        throw new ConflictException('This book is already in the cart');
      }

      // Create the cart entry
      const newCart = await this.prisma.cart.create({
        data: {
          userId,
          bookId,
          quantity,
        },
      });

      return {
        success: true,
        message: 'Cart created successfully',
        data: newCart,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to create cart',
        statusCode: HttpStatus.CONFLICT,
      };
    }
  }

  // ----------------------------------------------------------------------------------------------------------
  // GET /carts
  async findAll(): Promise<{
    success: boolean;
    message: string;
    data: any[]; // Return an array of objects containing both cart and book data
    statusCode: number;
  }> {
    try {
      const carts = await this.prisma.cart.findMany({
        include: {
          book: true, // Include the related book data
        },
      });

      return {
        success: true,
        message: 'Carts retrieved successfully',
        data: carts,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve carts',
        data: [],
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  // ----------------------------------------------------------------------------------------------------------
  // GET /cart by id
  async findOne(id: string): Promise<{
    success: boolean;
    message: string;
    data: Cart | null;
    statusCode: number;
  }> {
    const cart = await this.prisma.cart.findUnique({
      where: { id },
    });

    if (!cart) {
      return {
        success: false,
        message: `Cart with ID #${id} not found`,
        data: null,
        statusCode: HttpStatus.NOT_FOUND,
      };
    }

    return {
      success: true,
      message: `Cart with ID #${id} retrieved successfully`,
      data: cart,
      statusCode: HttpStatus.OK,
    };
  }

  // ----------------------------------------------------------------------------------------------------------

  async getCartByUserId(userId: string): Promise<{
    success: boolean;
    message: string;
    data: any[];
    statusCode: number;
  }> {
    try {
      // Validate the userId
      if (!ObjectId.isValid(userId)) {
        throw new HttpException(
          'Invalid user ID format',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Retrieve the cart items for the specific user
      const cartItems = await this.prisma.cart.findMany({
        where: {
          userId: userId, // Filter by userId
        },
        include: {
          book: true, // Include book details (optional, based on your needs)
        },
      });

      return {
        success: true,
        message: 'Cart items retrieved successfully',
        data: cartItems,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve cart items',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // ----------------------------------------------------------------------------------------------------------
  // UPDATE /cart by id
  async update(
    id: string,
    updateCartDto: UpdateCartDto,
  ): Promise<{
    success: boolean;
    message: string;
    data: Cart | null;
    statusCode: number;
  }> {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { id },
      });

      if (!cart) {
        return {
          success: false,
          message: `Cart with ID #${id} not found`,
          data: null,
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      const updatedCart = await this.prisma.cart.update({
        where: { id },
        data: {
          ...updateCartDto,
          updatedAt: new Date(),
        },
      });

      return {
        success: true,
        message: `Cart with ID #${id} updated successfully`,
        data: updatedCart,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update cart',
        data: null,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  // ----------------------------------------------------------------------------------------------------------
  // REMOVE /cart by id
  async remove(id: string): Promise<{
    success: boolean;
    message: string;
    data: null;
    statusCode: number;
  }> {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { id },
      });

      if (!cart) {
        return {
          success: false,
          message: `Cart with ID #${id} not found`,
          data: null,
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      await this.prisma.cart.delete({
        where: { id },
      });

      return {
        success: true,
        message: `Cart with ID #${id} removed successfully`,
        data: null,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to remove cart',
        data: null,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
