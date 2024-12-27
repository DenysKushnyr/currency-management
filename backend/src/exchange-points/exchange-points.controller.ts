import { BadRequestException, Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { DataService } from 'src/data/data.service';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/userRoles.decorator';
import { UserRole } from 'src/user/entities/user.roles';
import { CreateExchangePointDto } from './dto/exchange-point.dto';

@Controller('exchange_points')
export class ExchangePointsController {
    constructor(
        private dataService: DataService,
      ) { }

    @Get('getAll')
    async getAll() {
        return await this.dataService.exchangePointsRepository.find();
    }

    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Roles(UserRole.Admin)
    @Post('')
    async create(@Body() createExchangePointDto: CreateExchangePointDto) {
        if (await this.dataService.exchangePointsRepository.existsBy({address: createExchangePointDto.address})) {
            throw new BadRequestException("Точка з такою адресою вже існує");
        }
        return await this.dataService.exchangePointsRepository.save(createExchangePointDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        const result = await this.dataService.exchangePointsRepository.delete(id);
        return result.affected > 0 ? { message: 'Точка видалена.' } : { message: 'Точка не знайдена' };
    }
}
