import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockModule } from './stock/stock.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    StockModule, 
    JwtModule.register({ 
      global: true, 
      secret: process.env.SECRET, 
      signOptions: { expiresIn: '10m'}
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
