import { Query, NotFoundException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Tasks } from "@prisma/client";


@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService){}

    @Put(':id')
    async updateTask(@Body() data: Tasks, @Param('id') id: String){
        return this.taskService.updateTask(data, Number(id))
    }

    @Get('all')
    async getAllTasks(
      @Query('page') page: string,
      @Query('limit') limit: string,
    ) {
      return this.taskService.getAllTasks(page, limit);
    }

    @Get()
    async getTask(
      @Query('id') id: string, 
      @Query('title') title: string, 
      @Query('day') day: string
    ) {
      return this.taskService.getTask(id, title, day);
    }

    @Post()
    async createTask(@Body() data: Tasks){
        return this.taskService.createTask(data)
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: String){
        try {
            return await this.taskService.deleteTask(Number(id))
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

}