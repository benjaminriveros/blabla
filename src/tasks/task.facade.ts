import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { TaskDal } from "./task.dal";
import { CategoryDal } from "../category/category.dal.js"; // ¿Es esto legal? ajsjajs
import { CreateTaskDto, TaskQueryFindAllDto, ResponseTaskDto, TaskFindOneDto, TaskUpdateDto } from "./task.dto"
import { NotFoundException, BadRequestException } from "@nestjs/common";
import { UtilsService } from "src/utils/utils.service";

@Injectable()
export class TaskFacade {
    constructor(private readonly taskDal: TaskDal,
        private readonly categoryDal: CategoryDal,
        private readonly utilsService: UtilsService
    ) {}

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

    async updateTask(taskUpdateDto: TaskUpdateDto): Promise<ResponseTaskDto> {
        // 1. Obtener la tarea
        const taskFindOneDto = new TaskFindOneDto();
        taskFindOneDto.id = taskUpdateDto.id;
        const task = await this.taskDal.getTask(taskFindOneDto);

        // 2. Verificar si la fecha de la tarea es del pasado y si existe la tarea
        if(!task) throw new NotFoundException('Task not found');

        //const [day, month, year] = task.day.split('-');
        //const formattedDay =  `${year}-${month}-${day}`;
        //const taskDate = new Date(formattedDay);

        const taskDate = this.utilsService.formateDate(task.day)
        //2.2 si hay Id de categoría a asignar, verifiacr que ese Id exista.
        if(taskUpdateDto.categoryId && ! await this.categoryDal.findOneById(taskUpdateDto.categoryId))
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
        // 3. Si es del pasado, actualizarla
        if(taskDate < new Date()){
            return this.taskDal.updateTask(taskUpdateDto);
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
        if(!task) throw new HttpException('Task not found', HttpStatus.NOT_FOUND)
        return this.taskDal.deleteTask(id);
    }
}   