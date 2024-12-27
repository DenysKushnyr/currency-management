import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { DataService } from './data/data.service';
import { ExchangePointsModule } from './exchange-points/exchange-points.module';
import { UserModule } from './user/user.module';
import { DepositModule } from './deposit/deposit.module';
import { BalanceModule } from './balance/balance.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.getOrThrow("PGSQL_HOST"),
        port: configService.getOrThrow("PGSQL_PORT"),
        database: configService.getOrThrow("PGSQL_DATABASE"),
        username: configService.getOrThrow("PGSQL_USERNAME"),
        password: configService.getOrThrow("PGSQL_PASSWORD"),
        synchronize: configService.getOrThrow("PGSQL_SYNCHRONIZE"),
        autoLoadEntities: true,
      }),
      inject: [ConfigService]
    }),
    DataModule,
    UserModule,
    ExchangePointsModule,
    DepositModule,
    BalanceModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService, DataService]
})
export class AppModule {}
