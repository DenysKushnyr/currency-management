import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DataService } from 'src/data/data.service';
import { JwtType } from 'src/helpers/Jwt.type';
import { AuthUserDto } from './dto/auth-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user.roles';

@Controller('user')
export class UserController {
  constructor(
    private dataService: DataService,
    private jwtService: JwtService
  ) { }

  @Post('register')
  async register(@Body() userDto: AuthUserDto) {

    if (!await this.dataService.exchangePointsRepository.existsBy({ id: parseInt(userDto.exchangePointId) })) {
      throw new BadRequestException("Зазначеної точки не існує.");
    }

    if (await this.dataService.usersRepository.existsBy({
      exchangePointId: parseInt(userDto.exchangePointId),
      username: userDto.username
    })) {
      throw new BadRequestException("Такий користувач уже існує для цієї точки.");
    }

    const user = new User();
    user.username = userDto.username
    user.passwordHash = await bcrypt.hash(userDto.password, 2);
    user.role = UserRole.Employee;
    user.createdAt = new Date();
    user.exchangePointId = parseInt(userDto.exchangePointId);

    await this.dataService.usersRepository.save(user);

    const payload: JwtType = { sub: user.id, username: user.username, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  @Post('login')
  async login(@Body() userDto: AuthUserDto) {
    try {
      const user = await this.dataService.usersRepository.findOneByOrFail({
        username: userDto.username,
        exchangePointId: parseInt(userDto.exchangePointId)
      })


      if (await bcrypt.compare(userDto.password, user.passwordHash)) {
        const payload: JwtType = { sub: user.id, username: user.username, role: user.role };

        return {
          id: user.id,
          role: user.role,
          exchangePointId: parseInt(userDto.exchangePointId),
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new BadRequestException("Неправильний логін або пароль.");
      }

    } catch (e: any) {
      throw new BadRequestException("Неправильний логін або пароль.");
    }
  }
}
