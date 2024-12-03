import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateStatisticsDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new statistic for a seller
  async create(createStatisticDto: CreateStatisticsDto) {
    const {
      sellerId,
      totalSales,
      totalEarnings,
      topSellingBookId,
      totalVouchersCreated,
      totalVouchersUsed,
    } = createStatisticDto;

    try {
      // Validate seller existence
      const sellerExists = await this.prisma.user.findUnique({
        where: { id: sellerId },
      });

      if (!sellerExists) {
        throw new HttpException(
          'Seller does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Create a new statistic entry
      const newStatistic = await this.prisma.statistics.create({
        data: {
          sellerId,
          totalSales,
          totalEarnings,
          topSellingBookId,
          totalVouchersCreated,
          totalVouchersUsed,
        },
      });

      return {
        success: true,
        message: 'Statistic created successfully',
        data: newStatistic,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create statistic',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Find all statistics
  async findAll() {
    try {
      const statistics = await this.prisma.statistics.findMany();

      return {
        success: true,
        message: 'Statistics retrieved successfully',
        data: statistics,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve statistics',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getStatisticsBySellerId(sellerId: string): Promise<{
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
      const statistics = await this.prisma.statistics.findMany({
        where: {
          sellerId: sellerId, // Filter books by sellerId
        },
      });

      return {
        success: true,
        message: 'Statistics retrieved successfully',
        data: statistics,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve statistics',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Find a single statistic by ID
  async findOne(id: string) {
    try {
      const statistic = await this.prisma.statistics.findUnique({
        where: { id },
      });

      if (!statistic) {
        throw new HttpException('Statistic not found', HttpStatus.NOT_FOUND);
      }

      return {
        success: true,
        message: 'Statistic retrieved successfully',
        data: statistic,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve statistic',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Update statistics for a seller
  async update(id: string, updateStatisticDto: UpdateStatisticDto) {
    try {
      // Find existing statistic
      const existingStatistic = await this.prisma.statistics.findUnique({
        where: { id },
      });

      if (!existingStatistic) {
        throw new HttpException('Statistic not found', HttpStatus.NOT_FOUND);
      }

      // Update statistic with new data
      const updatedStatistic = await this.prisma.statistics.update({
        where: { id },
        data: updateStatisticDto,
      });

      return {
        success: true,
        message: 'Statistic updated successfully',
        data: updatedStatistic,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update statistic',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Remove a statistic by ID
  async remove(id: string) {
    try {
      const existingStatistic = await this.prisma.statistics.findUnique({
        where: { id },
      });

      if (!existingStatistic) {
        throw new HttpException('Statistic not found', HttpStatus.NOT_FOUND);
      }

      // Delete the statistic
      await this.prisma.statistics.delete({
        where: { id },
      });

      return {
        success: true,
        message: 'Statistic removed successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to remove statistic',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
