import { Module } from '@nestjs/common';
import { DataModule } from 'src/data/data.module';
import { ExchangePointsController } from './exchange-points.controller';

@Module({
  imports: [DataModule],
  controllers: [ExchangePointsController]
})
export class ExchangePointsModule {}
