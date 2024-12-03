import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
// @UseGuards(JwtAuthGuard, RolesGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // @ApiBearerAuth()
  // @Roles(Role.ADMIN)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  // @ApiBearerAuth()
  // @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get('sellerId')
  async findBySellerId(@Query('sellerId') sellerId: string) {
    return await this.bookService.findBySellerId(sellerId);
  }

  // @Get('search')
  // async searchBooks(@Query('q') query: string) {
  //   console.log('sss');

  //   if (!query) {
  //     throw new HttpException(
  //       'Query parameter "q" is required',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   return await this.bookService.searchBooks(query);
  // }

  @Get('search')
  async searchBooks(@Query('q') query: string) {
    console.log('Received query:', query); // You can log the query to debug

    if (!query || query.trim() === '') {
      throw new HttpException(
        'Query parameter "q" is required and cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const result = await this.bookService.searchBooks(query);
      return {
        success: true,
        message: `Books found for query: ${query}`,
        data: result,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to search books',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
