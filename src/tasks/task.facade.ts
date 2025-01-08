import { Injectable } from "@nestjs/common";
import { TaskDal } from "./task.dal";
import { CreateTaskDto, TaskQueryFindAllDto, FindAllTaskDto } from "./task.dto";

@Injectable()
export class TaskFacade {
    constructor(private readonly taskDal: TaskDal){
        //se ocupa bll
        //necesita dal de user
        //necesita dal de categorias
    }

    async createTask(createTaskDto: CreateTaskDto){
        return this.taskDal.createTask(createTaskDto);
    }

    async getAllTasks(taskQueryFindAllDto: TaskQueryFindAllDto): Promise<FindAllTaskDto[]> { 
        // Debo declarar el tipo de retorno con Promise<CreateTaskDto[]>?
        return this.taskDal.getAllTasks(taskQueryFindAllDto);
    }

/*    public async update(task: TaskUpdateDto){
        //existe el refitros
        //es del pasado
        //actualizarlo?
    }*/
}