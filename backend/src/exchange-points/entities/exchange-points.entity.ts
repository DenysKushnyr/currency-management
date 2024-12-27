import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExchangePoint {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    address: string;

    constructor(id: number);
    constructor(id: number, address: string);

    constructor(id: number, address?: string) {
        this.id = id;
        this.address = address;
    }
}