import { Query, NotFoundException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Tasks } from "@prisma/client";
import { TaskCreateDto, TaskQueryFindAllDto, TaskUpdateDto } from "./task.dto";

/*GET tasks
GET tasks/:id
POST tasks
PUT  tasks/:id
DELETE tasks/:id

POST task/invited-user*/

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService){}
    
    @Post()
    async createTask(@Body() taskCreateDto: TaskCreateDto){
        return this.taskService.createTask(taskCreateDto)
    }

    /*    @Put('')
    async updateTask(@Body() data: TaskUpdateDto){
        return this.taskService.updateTask(data)
    }*/

    @Get('all')
    async getAllTasks(
      @Query() {page, limit}: TaskQueryFindAllDto,
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


    @Delete(':id')
    async deleteTask(@Param('id') id: String){
            return await this.taskService.deleteTask(Number(id))

    }

}