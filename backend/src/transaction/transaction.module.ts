import { Module } from '@nestjs/common';
import { DataModule } from 'src/data/data.module';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [DataModule],
  controllers: [TransactionController]
})
export class TransactionModule {}
