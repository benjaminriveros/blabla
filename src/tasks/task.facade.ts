import { Injectable } from "@nestjs/common";
import { TaskDal } from "./task.dal";
import { CreateTaskDto, TaskQueryFindAllDto, ResponseTaskDto, TaskFindOneDto, TaskUpdateDto } from "./task.dto"
import { NotFoundException, BadRequestException } from "@nestjs/common";

@Injectable()
export class TaskFacade {
    constructor(private readonly taskDal: TaskDal){
        //se ocupa bll?
        //necesita dal de user ?
        //necesita dal de categorias? 
    }

    async createTask(createTaskDto: CreateTaskDto){
        return this.taskDal.createTask(createTaskDto);
    }

    async getAllTasks(taskQueryFindAllDto: TaskQueryFindAllDto): Promise<ResponseTaskDto[]> { 
        // Debo declarar el tipo de retorno con Promise<ResponseTaskDto[]>?
        return this.taskDal.getAllTasks(taskQueryFindAllDto);
    }

    async getTask(TaskFindOneDto: TaskFindOneDto): Promise<ResponseTaskDto> {
        return this.taskDal.getTask(TaskFindOneDto);
    }

    async updateTask(taskupdateDto: TaskUpdateDto): Promise<ResponseTaskDto> {
        // 1. Obtener la tarea
        const taskFindOneDto = new TaskFindOneDto();
        taskFindOneDto.id = taskupdateDto.id;
        const task = await this.taskDal.getTask(taskFindOneDto);

        // 2. Verificar si la fecha de la tarea es del pasado y si existe la tarea
        if(!task) throw new NotFoundException('Task not found');

        const [day, month, year] = task.day.split('-');
        const formattedDay =  `${year}-${month}-${day}`;
        const taskDate = new Date(formattedDay);

        // 3. Si es del pasado, actualizarla
        if(taskDate < new Date()){
            return this.taskDal.updateTask(taskupdateDto);
        }
        // 4. Si no es del pasado, lanzar un error
        throw new BadRequestException('You cannot update a task from the future');
    }
    async deleteTask(id: number): Promise<ResponseTaskDto>{
        // 1. Obtener la tarea
        const taskFindOneDto = new TaskFindOneDto();
        taskFindOneDto.id = id;
        const task = await this.taskDal.getTask(taskFindOneDto);

        // 2. Verifica si exite la tarea. Si existe, eliminarla, si no existe, lanzar un error
        if(!task) throw new NotFoundException('Task not found');
        return this.taskDal.deleteTask(id);
    }
}   