import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from 'src/balance/entities/balance.entity';
import { Deposit } from 'src/deposit/entities/deposit.entity';
import { ExchangePoint } from 'src/exchange-points/entities/exchange-points.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { User } from 'src/user/entities/user.entity';
import { DataService } from './data.service';

const features = TypeOrmModule.forFeature([User, ExchangePoint, Deposit, Balance, Transaction]);
@Module({
  imports: [features],
  providers: [DataService],
  exports: [DataService, features]
})
export class DataModule {}
