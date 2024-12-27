import { UserRole } from "src/user/entities/user.roles";

export class JwtType {
    sub: number;
    username: string;
    role: UserRole;
}