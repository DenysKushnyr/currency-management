import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Balance } from 'src/balance/entities/balance.entity';
import { DataService } from 'src/data/data.service';
import { ExchangePoint } from 'src/exchange-points/entities/exchange-points.entity';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/userRoles.decorator';
import { UserRole } from 'src/user/entities/user.roles';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { Deposit } from './entities/deposit.entity';

@Controller('deposits')
export class DepositController {
  constructor(private readonly dataService: DataService) { }

  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles(UserRole.Employee)
  @Post()
  async create(@Body() createDepositDto: CreateDepositDto): Promise<Deposit> {
    const newDeposit = new Deposit(createDepositDto);
    let balance = await this.dataService.balanceRepository.findOneBy(
      {
        exchangePoint: {
          id: createDepositDto.exchangePointId
        },
        currencyCode: createDepositDto.currencyCode
      });
    if (!balance) {
      balance = new Balance();
      balance.exchangePoint = new ExchangePoint(createDepositDto.exchangePointId);
      balance.currencyCode = createDepositDto.currencyCode;
      balance.amount = createDepositDto.amount;
    } else {
      balance.amount += createDepositDto.amount;
    }

    await this.dataService.balanceRepository.save(balance);

    return await this.dataService.depositRepository.save(newDeposit);
  }

  @Get()
  async findAll(): Promise<Deposit[]> {
    return await this.dataService.depositRepository.find({
      relations: {
        user: true,
        exchangePoint: true
      }
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const result = await this.dataService.depositRepository.delete(id);
    return result.affected > 0 ? { message: 'Депозит видалено.' } : { message: 'Депозит не знайдено' };
  }
}
