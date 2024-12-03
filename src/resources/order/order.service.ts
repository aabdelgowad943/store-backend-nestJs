import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE: Create a new order
  async create(createOrderDto: CreateOrderDto): Promise<{
    success: boolean;
    message: string;
    data?: Order;
    statusCode: number;
  }> {
    try {
      const { buyerId, bookId, amount } = createOrderDto;

      // Validate the buyer and book exist (as before)
      const buyer = await this.prisma.user.findUnique({
        where: { id: buyerId },
      });
      if (!buyer)
        throw new NotFoundException(`Buyer with ID ${buyerId} not found`);

      const book = await this.prisma.book.findUnique({ where: { id: bookId } });
      if (!book)
        throw new NotFoundException(`Book with ID ${bookId} not found`);

      // Create the order with default status
      const newOrder = await this.prisma.order.create({
        data: {
          buyerId,
          bookId,
          amount,
          status: 'PENDING',
          updatedAt: new Date(), // Set explicitly
        },
      });

      return {
        success: true,
        message: 'Order created successfully',
        data: newOrder,
        statusCode: 201,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to create order',
        statusCode: 400,
      };
    }
  }

  // FIND ALL: Retrieve all orders
  async findAll(): Promise<{
    success: boolean;
    message: string;
    data: Order[];
    statusCode: number;
  }> {
    try {
      const orders = await this.prisma.order.findMany();

      return {
        success: true,
        message: 'Orders retrieved successfully',
        data: orders,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve order',
        data: [],
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  // FIND ONE: Retrieve an order by ID
  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order with ID #${id} not found`);
    }

    return {
      success: true,
      message: `Order with ID #${id} retrieved successfully`,
      data: order,
      statusCode: 200,
    };
  }

  // UPDATE: Update an existing order by ID
  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.prisma.order.findUnique({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order with ID #${id} not found`);
    }

    // Update the order with the provided fields
    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        ...updateOrderDto,
      },
    });

    return {
      success: true,
      message: `Order with ID #${id} updated successfully`,
      data: updatedOrder,
      statusCode: 200,
    };
  }

  // REMOVE: Remove an order by ID
  async remove(id: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order with ID #${id} not found`);
    }

    const removedOrder = await this.prisma.order.delete({ where: { id } });

    return {
      success: true,
      message: `Order with ID #${id} removed successfully`,
      data: removedOrder,
      statusCode: 200,
    };
  }
}
