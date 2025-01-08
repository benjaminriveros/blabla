import { Query, NotFoundException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Tasks } from "@prisma/client";
import { CreateTaskDto, TaskQueryFindAllDto } from "./task.dto";

/*GET tasks
GET tasks/:id
POST tasks
PUT  tasks/:id
DELETE tasks/:id

POST task/invited-user */

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}
    
    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto){
        return this.taskService.createTask(createTaskDto)
    }

    @Get('all')
    async getAllTasks(@Query() queryParams: { page: string; limit: string }) {
      // Convertir los datos obtenidos de la URL a números
      const page = Number(queryParams.page)
      const limit = Number(queryParams.limit)
    
      // Construir el DTO
      const taskQueryFindAllDto = new TaskQueryFindAllDto();
      taskQueryFindAllDto.page = page;
      taskQueryFindAllDto.limit = limit;
    
      return this.taskService.getAllTasks(taskQueryFindAllDto);
    }

    /*    @Put('')
    async updateTask(@Body() data: TaskUpdateDto){
        return this.taskService.updateTask(data)
    }*/


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