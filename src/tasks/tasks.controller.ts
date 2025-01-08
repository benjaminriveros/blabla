import { Query, NotFoundException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Tasks } from "@prisma/client";
import { CreateTaskDto, TaskFindOneDto, TaskQueryFindAllDto, ResponseTaskDto, TaskUpdateDto } from "./task.dto";

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
    async getAllTasks(@Query() queryParams: { page: string; limit: string }): Promise<ResponseTaskDto[]> {
      // Convertir los datos obtenidos de la URL a números
      const page = Number(queryParams.page)
      const limit = Number(queryParams.limit)
    
      // Construir el DTO
      const taskQueryFindAllDto = new TaskQueryFindAllDto();
      taskQueryFindAllDto.page = page;
      taskQueryFindAllDto.limit = limit;
    
      return this.taskService.getAllTasks(taskQueryFindAllDto);
    }
    
    @Get()
    async getTask(@Query() queryParams: { day?: string; title?: string; id?: string }): Promise<ResponseTaskDto> {
        const id = Number(queryParams.id);
        const taskQueryFindOneDto = new TaskFindOneDto();
        taskQueryFindOneDto.id = id;
        return this.taskService.getTask(taskQueryFindOneDto);
    }
/*si de una petición HTTP quiero extraer variables de la url con @query y datos con @body y almacenar todo en DTO's, sería algo así?:*/
    @Put(':id')
    async updateTask(
        @Body() taskupdateDto: TaskUpdateDto,
        @Param('id') id: string
    ){
        taskupdateDto.id = parseInt(id)
        return this.taskService.updateTask(taskupdateDto)
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: String){
            return await this.taskService.deleteTask(Number(id))

    }

}