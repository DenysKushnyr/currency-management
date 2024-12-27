import { Controller, Get } from '@nestjs/common';
import { DataService } from 'src/data/data.service';

@Controller('balances')
export class BalanceController {
    constructor(private readonly dataService: DataService) { }

    @Get('')
    async getAll() {
        return await this.dataService.balanceRepository.find({
            relations: {
                exchangePoint: true
            }
        });
    }
}
