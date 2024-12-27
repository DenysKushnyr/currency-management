import { CurrencyCode } from "src/common/currency-code.enum";
import { ExchangePoint } from "src/exchange-points/entities/exchange-points.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateDepositDto } from "../dto/create-deposit.dto";

export class DecimalColumnTransformer {
    to(data: number): number {
        return data;
    }
    from(data: string): number {
        return parseFloat(data);
    }
}

@Entity()
export class Deposit {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    currencyCode: CurrencyCode;    
    @Column("decimal", { precision: 15, scale: 6, transformer: new DecimalColumnTransformer() })
    amount: number;
    @ManyToOne(() => User)
    @JoinTable()
    user: User;
    @ManyToOne(() => ExchangePoint)
    @JoinColumn()
    exchangePoint: ExchangePoint;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    timestamp: Date;

    constructor(dto?: CreateDepositDto) {
        if (dto) { 
            this.currencyCode = dto.currencyCode;
            this.amount = dto.amount;
            this.user = new User({id: dto.userId});
            this.exchangePoint = new ExchangePoint(dto.exchangePointId);
        }
    }
}