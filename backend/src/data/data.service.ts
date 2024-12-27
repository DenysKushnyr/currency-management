import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from 'src/balance/entities/balance.entity';
import { Deposit } from 'src/deposit/entities/deposit.entity';
import { ExchangePoint } from 'src/exchange-points/entities/exchange-points.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DataService {
    constructor(
        @InjectRepository(User)
        public usersRepository: Repository<User>,
        @InjectRepository(ExchangePoint)
        public exchangePointsRepository: Repository<ExchangePoint>,
        @InjectRepository(Deposit)
        public depositRepository: Repository<Deposit>,
        @InjectRepository(Balance)
        public balanceRepository: Repository<Balance>,
        @InjectRepository(Transaction)
        public transactionRepository: Repository<Transaction>,
    ) { }
}
