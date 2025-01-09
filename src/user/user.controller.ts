import { Param, Body, Query, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, QueryFindByName, QueryUpdateUserDto, ResponseUserDto } from './user.dto';
import { UtilsService } from 'src/utils/utils.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly utilsService: UtilsService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto>{
        createUserDto.birthDate = this.utilsService.formateDate(createUserDto.birthDate)
        return this.userService.createUser(createUserDto)
    }

    @Get(':id')
    async findUserById(@Param('id') id: string): Promise<ResponseUserDto>{
        return this.userService.findUserById(id)
    }

    @Get()
    async getUsersByName(
        @Query() query: QueryFindByName,
    ): Promise <ResponseUserDto[]> {
        return this.userService.findUserByname(query)
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() queryUpdateUserDto: QueryUpdateUserDto
    ): Promise <any> {
        if(queryUpdateUserDto.birthDate)
            queryUpdateUserDto.birthDate = this.utilsService.formateDate(queryUpdateUserDto.birthDate)
        return this.userService.updateUser(id, queryUpdateUserDto)
    }
}
