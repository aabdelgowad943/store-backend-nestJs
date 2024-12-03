import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './resources/user/user.module';
import { BookModule } from './resources/book/book.module';
import { OrderModule } from './resources/order/order.module';
import { VoucherModule } from './resources/voucher/voucher.module';
import { StatisticsModule } from './resources/statistics/statistics.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './resources/cart/cart.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CartModule,
    BookModule,
    OrderModule,
    VoucherModule,
    StatisticsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
