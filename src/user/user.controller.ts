import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { TaskResponseDto } from 'src/tasks/task.dto';
import { UserTaskFacade } from 'src/user-task/user-task.facade';
import { UtilsService } from 'src/utils/utils.service';
import { CreateUserDto, QueryFindByName, QueryUpdateUserDto, UserResponseDto } from './user.dto';
import { UserFacade } from './user.facade';

@Controller('user')
export class UserController {
    constructor(
        private readonly userFacade: UserFacade,
        private readonly utilsService: UtilsService,
        private readonly userTaskFacade: UserTaskFacade
    ) { }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        return this.userFacade.createUser(createUserDto)
    }

    @Get(':id')
    async findUserById(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto> {
        return this.userFacade.findUserById(id)
    }

    @Get()
    async getUsersByName(
        @Query() query: QueryFindByName,
    ): Promise<UserResponseDto[]> {
        return this.userFacade.findUserByName(query)
    }

    @Put(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() queryUpdateUserDto: QueryUpdateUserDto
    ): Promise<UserResponseDto> {
        return this.userFacade.updateUser(id, queryUpdateUserDto)
    }

    @Post(':id/task')
    public async setRelation(
        @Param('id', ParseIntPipe) userId: number,
        @Body() body: { taskId: number }
    ): Promise<string> {
        const nCreated = await this.userTaskFacade.createTaskUser([userId], body.taskId)
        return `${nCreated} relations have been created`
    }

    @Get(':id/task')
    public async getTasks(
        @Param('id', ParseIntPipe) userId: number,
    ): Promise<TaskResponseDto[]> {
        return this.userFacade.getTasks(userId)
    }
}
