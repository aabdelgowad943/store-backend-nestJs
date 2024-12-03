import {
  Injectable,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { PrismaService } from 'prisma/prisma.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class VoucherService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new voucher
  async create(createVoucherDto: CreateVoucherDto) {
    const { bookId, sellerId, code, discount, expiration } = createVoucherDto;

    // Validate that the seller exists
    const sellerExists = await this.prisma.user.findUnique({
      where: { id: sellerId },
    });
    if (!sellerExists) {
      throw new HttpException(
        'Invalid sellerId: User does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Validate that the book exists
    const bookExists = await this.prisma.book.findUnique({
      where: { id: bookId },
    });
    if (!bookExists) {
      throw new HttpException(
        'Invalid bookId: Book does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Ensure the seller owns the book
    if (bookExists.sellerId !== sellerId) {
      throw new HttpException(
        'Invalid sellerId: This seller does not own the book',
        HttpStatus.FORBIDDEN,
      );
    }

    // Check if a voucher with the same code already exists
    const existingVoucher = await this.prisma.voucher.findUnique({
      where: { code },
    });

    if (existingVoucher) {
      throw new HttpException(
        'Voucher code already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Create the voucher
    const newVoucher = await this.prisma.voucher.create({
      data: {
        code,
        discount,
        expiration: new Date(expiration), // Ensure expiration is a Date object
        bookId,
        sellerId,
      },
    });

    return {
      success: true,
      message: 'Voucher created successfully',
      data: newVoucher,
      statusCode: HttpStatus.CREATED,
    };
  }

  // Retrieve all vouchers
  async findAll() {
    const vouchers = await this.prisma.voucher.findMany();
    return {
      success: true,
      message: 'Vouchers retrieved successfully',
      data: vouchers,
      statusCode: HttpStatus.OK,
    };
  }

  async getVoucherBySellerId(sellerId: string): Promise<{
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
      const vouchers = await this.prisma.voucher.findMany({
        where: {
          sellerId: sellerId, // Filter books by sellerId
        },
      });

      return {
        success: true,
        message: 'Vouchers retrieved successfully',
        data: vouchers,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve vouchers',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieve a specific voucher by ID
  async findOne(id: string) {
    const voucher = await this.prisma.voucher.findUnique({
      where: { id },
    });
    if (!voucher) {
      throw new NotFoundException(`Voucher with ID ${id} not found`);
    }

    return {
      success: true,
      message: 'Voucher retrieved successfully',
      data: voucher,
      statusCode: HttpStatus.OK,
    };
  }

  // Update a voucher
  async update(id: string, updateVoucherDto: UpdateVoucherDto) {
    const voucher = await this.prisma.voucher.findUnique({ where: { id } });
    if (!voucher) {
      throw new NotFoundException(`Voucher with ID ${id} not found`);
    }

    const updatedVoucher = await this.prisma.voucher.update({
      where: { id },
      data: {
        ...updateVoucherDto,
      },
    });

    return {
      success: true,
      message: 'Voucher updated successfully',
      data: updatedVoucher,
      statusCode: HttpStatus.OK,
    };
  }

  // Remove a voucher
  async remove(id: string) {
    const voucher = await this.prisma.voucher.findUnique({ where: { id } });
    if (!voucher) {
      throw new NotFoundException(`Voucher with ID ${id} not found`);
    }

    await this.prisma.voucher.delete({ where: { id } });

    return {
      success: true,
      message: 'Voucher removed successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
