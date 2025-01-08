import { Injectable } from "@nestjs/common";
import { UtilsService } from "../utils/utils.service.js";
import { TaskQueryFindAllDto, CreateTaskDto, ResponseTaskDto, TaskFindOneDto, TaskUpdateDto } from "./task.dto.js";
import { TaskFacade } from "./task.facade.js";


@Injectable()
export class TasksService {
    constructor(private utilsService: UtilsService, private taskFacade: TaskFacade) {}
    
    async createTask(data: CreateTaskDto): Promise<CreateTaskDto> {
        return this.taskFacade.createTask(data);
    }
    
    async getAllTasks(taskQueryFindAllDto: TaskQueryFindAllDto): Promise<ResponseTaskDto[]> {
        return this.taskFacade.getAllTasks(taskQueryFindAllDto);
    }

    async getTask(taskQueryFindOneDto: TaskFindOneDto): Promise<ResponseTaskDto> {
        return this.taskFacade.getTask(taskQueryFindOneDto);
    }

    async updateTask(taskupdateDto:TaskUpdateDto): Promise<ResponseTaskDto> {
        return this.taskFacade.updateTask(taskupdateDto);
    }

    async deleteTask(id: number): Promise<ResponseTaskDto> {
        return this.taskFacade.deleteTask(id);
    }
}