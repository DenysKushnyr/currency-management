import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user.roles";

@Entity()
export class User {
    constructor(user?: Partial<User>) {
        if (user)
        {
            Object.assign(this, user);
        }
    }

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    passwordHash: string;
    @Column()
    role: UserRole;
    @Column()
    createdAt: Date;
    @Column()
    exchangePointId: number;
}