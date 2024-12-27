import { CurrencyCode } from "src/common/currency-code.enum";
import { DecimalColumnTransformer } from "src/deposit/entities/deposit.entity";
import { ExchangePoint } from "src/exchange-points/entities/exchange-points.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ExchangePoint)
    @JoinColumn()
    exchangePoint: ExchangePoint;

    @Column()
    currencyCodeFrom: CurrencyCode;

    @Column("decimal", { precision: 15, scale: 6, transformer: new DecimalColumnTransformer() })
    amountFrom: number;

    @Column()
    currencyCodeTo: CurrencyCode;

    @Column("decimal", { precision: 15, scale: 6, transformer: new DecimalColumnTransformer() })
    amountTo: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    timestamp: Date;
}