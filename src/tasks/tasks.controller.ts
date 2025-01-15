import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { CreateTaskDto, TaskFindOneDto, TaskQueryFindAllDto, TaskResponseDto, TaskUpdateDto, TaskWithUsersResponseDto } from "./task.dto";
import { TaskFacade } from "./task.facade";

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly taskFacade: TaskFacade
    ) { }

    @Post()
    async createTask(
        @Body() createTaskDto: CreateTaskDto
    ): Promise<TaskResponseDto> {

        return this.taskFacade.createTask(createTaskDto)
    }

    @Get('all')
    async getAllTasks(
        @Query() query: TaskQueryFindAllDto
    ): Promise<TaskResponseDto[]> {

        return this.taskFacade.getAllTasks(query);
    }

    @Get()
    async getTask(
        @Query() query: TaskFindOneDto
    ): Promise<TaskResponseDto> {

        return this.taskFacade.getTaskByFilter(query);
    }

    @Put(':id')
    async updateTask(
        @Body() taskUpdateDto: TaskUpdateDto,
        @Param('id', ParseIntPipe) id: number
    ): Promise<TaskResponseDto> {

        return this.taskFacade.updateTask(id, taskUpdateDto)
    }

    @Delete(':id')
    async deleteTask(
        @Param('id') id: String
    ): Promise<TaskResponseDto> {

        return this.taskFacade.deleteTask(Number(id))
    }

    @Get(':id/users')
    public async getTasksUser(
        @Param('id', ParseIntPipe) id: number
    ): Promise<TaskWithUsersResponseDto> {

        return this.taskFacade.getUsersByTask(Number(id))
    }

    @Delete(':id/user')
    public async deleteUsers(
        @Param('id') id: string
    ): Promise<any> {
        
        return this.taskFacade.deleteUserTask(Number(id))
    }
}