import { Injectable, NotFoundException } from "@nestjs/common";
import { UserTaskDal } from "src/user-task/user-task.dal";
import { UserTaskResponseDto } from "src/user-task/user-task.dto";
import { TaskBll } from "./task.bll";
import { TaskDal } from "./task.dal";
import { CreateTaskDto, TaskFindOneDto, TaskQueryFindAllDto, TaskResponseDto, TaskUpdateDto, TaskWithUsersResponseDto } from "./task.dto";

@Injectable()
export class TaskFacade {
    constructor(private readonly taskDal: TaskDal,
        private readonly userTaskDal: UserTaskDal,
        private readonly taskBll: TaskBll
    ) { }

    public async getTaskById(id: number): Promise<TaskResponseDto> {
        const task = await this.taskDal.getTaskById(id)
        if (!task) throw new NotFoundException
        return task
    }

    public async createTask(createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {

        return this.taskDal.createTask(createTaskDto);
    }

    public async getAllTasks(taskQueryFindAllDto: TaskQueryFindAllDto): Promise<TaskResponseDto[]> {

        return this.taskDal.getAllTasks(taskQueryFindAllDto);
    }

    public async getTaskByFilter(taskFindOneDto: TaskFindOneDto): Promise<TaskResponseDto> {

        return this.taskDal.getTaskByFilter(taskFindOneDto);
    }

    public async updateTask(id: number, taskUpdateDto: TaskUpdateDto): Promise<TaskResponseDto> {

        this.getTaskById(id)

        return this.taskBll.updateTask(id, taskUpdateDto)
    }

    async deleteTask(id: number): Promise<TaskResponseDto> {

        this.getTaskById(id)

        return this.taskDal.deleteTask(id);
    }

    public async getUsersByTask(id: number): Promise<TaskWithUsersResponseDto> {
        this.getTaskById(id)
        return this.taskDal.getUsersByTask(id)
    }

    public async deleteUserTask(id: number): Promise<UserTaskResponseDto> {
        return this.userTaskDal.deleteRelation(id)
    }
}   