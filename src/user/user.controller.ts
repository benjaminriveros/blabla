import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { UtilsService } from 'src/utils/utils.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly utilsService: UtilsService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<any>{
        createUserDto.birthDate = this.utilsService.formateDate(createUserDto.birthDate)
        return this.userService.createUser(createUserDto)
    }
}
