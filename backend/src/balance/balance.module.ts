import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [DataModule],
  controllers: [BalanceController]
})
export class BalanceModule {}
