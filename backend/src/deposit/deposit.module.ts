import { Module } from '@nestjs/common';
import { DataModule } from 'src/data/data.module';
import { DepositController } from './deposit.controller';

@Module({
  imports: [DataModule],
  controllers: [DepositController],
  providers: [],
})
export class DepositModule {}
