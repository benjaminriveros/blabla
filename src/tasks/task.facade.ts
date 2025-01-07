import { Injectable } from "@nestjs/common";
import { TaskDal } from "./task.dal";
import { TaskCreateDto } from "./task.dto";

@Injectable()
export class TaskFacade {
    constructor(private readonly taskDal: TaskDal){
        //se ocupa bll
        //necesita dal de user
        //necesita dal de categorias
    }

    async create(taskCreateDto: TaskCreateDto){
        // Lógica de negocio más compleja
        return this.taskDal.create(taskCreateDto);
    }

/*    public async update(task: TaskUpdateDto){
        //existe el refitros
        //es del pasado
        //actualizarlo?
    }*/
}