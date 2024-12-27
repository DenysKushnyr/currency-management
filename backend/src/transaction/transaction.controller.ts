import { BadRequestException, Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Balance } from 'src/balance/entities/balance.entity';
import { DataService } from 'src/data/data.service';
import { ExchangePoint } from 'src/exchange-points/entities/exchange-points.entity';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/userRoles.decorator';
import { UserRole } from 'src/user/entities/user.roles';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly dataService: DataService) { }

    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Roles(UserRole.Employee)
    @Post()
    async create(@Body() createTransactionDto: CreateTransactionDto) {
        
        let currencyToBalance = await this.dataService.balanceRepository
            .findOneBy({
                currencyCode: createTransactionDto.currencyCodeTo,
                exchangePoint: {
                    id: createTransactionDto.exchangePointId
                }
            });


        if (!currencyToBalance || currencyToBalance.amount < createTransactionDto.amountTo) {
            throw new BadRequestException("Недостатньо коштів на балансі для цієї валюти!")
        } else {
            currencyToBalance.amount -= createTransactionDto.amountTo;

            await this.dataService.balanceRepository.save(currencyToBalance);
        }

        const newTransaction = new Transaction();
        newTransaction.exchangePoint = new ExchangePoint(createTransactionDto.exchangePointId);
        newTransaction.currencyCodeFrom = createTransactionDto.currencyCodeFrom;
        newTransaction.amountFrom = createTransactionDto.amountFrom;
        newTransaction.currencyCodeTo = createTransactionDto.currencyCodeTo;
        newTransaction.amountTo = createTransactionDto.amountTo;

        let currencyFromBalance = await this.dataService.balanceRepository
            .findOneBy({
                currencyCode: createTransactionDto.currencyCodeFrom,
                exchangePoint: {
                    id: createTransactionDto.exchangePointId
                }
            });

        if (!currencyFromBalance) {
            currencyFromBalance = new Balance();
            currencyFromBalance.exchangePoint = new ExchangePoint(createTransactionDto.exchangePointId);
            currencyFromBalance.currencyCode = createTransactionDto.currencyCodeFrom;
            currencyFromBalance.amount = createTransactionDto.amountFrom;
        } else {      
            currencyFromBalance.amount += createTransactionDto.amountFrom;
        }

        await this.dataService.balanceRepository.save(currencyFromBalance);



        return await this.dataService.transactionRepository.save(newTransaction);
    }

    @Get()
    async findAll() {
        return await this.dataService.transactionRepository.find({relations: {
            exchangePoint: true
        }});
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: number) {
        const result = await this.dataService.transactionRepository.delete(id);
        return result.affected > 0 ? { message: 'Транзакція видалена.' } : { message: 'Транзакція не знайдена' };
    }
}
