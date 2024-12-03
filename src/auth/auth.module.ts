import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { WinstonModule } from 'nest-winston';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: 'ss',
      signOptions: { expiresIn: '1h' },
    }),
    WinstonModule.forRoot({}), // Import WinstonModule here
  ],
  providers: [AuthService, JwtService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
