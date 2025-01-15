import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { UserResponseDto } from 'src/user/user.dto';
import { UtilsService } from 'src/utils/utils.service';
import { CreateTaskDto, TaskFindOneDto, TaskQueryFindAllDto, TaskResponseDto, TaskUpdateDto, TaskWithUsersResponseDto } from './task.dto';

@Injectable()
export class TaskDal {
    constructor(private prisma: PrismaService, private readonly utilsService: UtilsService) { }

    async createTask(createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
        const data = this.cleanDto(createTaskDto)

        const created = await this.prisma.tasks.create({
            data: createTaskDto
        })
        return new TaskResponseDto(created)
    }

    async getAllTasks(taskQueryFindAllDto: TaskQueryFindAllDto): Promise<TaskResponseDto[]> {
        const { page, limit } = taskQueryFindAllDto;
        const tasks = await this.prisma.tasks.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
        return tasks.map(task => new TaskResponseDto(task));
    }

    public async getTaskById(id: number): Promise<TaskResponseDto> {
        const task = await this.prisma.tasks.findFirst({
            where: {
                id
            }
        })
        return new TaskResponseDto(task)
    }

    async getTaskByFilter(taskFindOneDto: TaskFindOneDto): Promise<TaskResponseDto> {

        const where = this.cleanDto(taskFindOneDto)
        const found = await this.prisma.tasks.findFirst({
            where
        });

        return new TaskResponseDto(found)
    }



    async updateTask(id: number, taskUpdateDto: TaskUpdateDto): Promise<TaskResponseDto> {
        const data = this.cleanDto(taskUpdateDto)

        const updated = await this.prisma.tasks.update({
            where: {
                id
            },
            data
        });
        return new TaskResponseDto(updated)
    }

    async deleteTask(id: number) {
        return this.prisma.tasks.delete({
            where: {
                id
            }
        });
    }

    public async getUsersByTask(id: number): Promise<TaskWithUsersResponseDto> {
        const found = await this.prisma.tasks.findFirst({
            where: {
                id
            },
            include: {
                userTask: {
                    include: {
                        user: true
                    }
                }
            }
        });
        const taskDto = new TaskResponseDto({
            ...found
        });

        const usersDto = found.userTask.map(userTask => new UserResponseDto({
            ...userTask.user
        }));

        return new TaskWithUsersResponseDto(taskDto, usersDto);
    }
    private cleanDto(input) {
        const cleanDto = {}
        Object.keys(input).forEach(key => {
            if (input[key] != null) {
                cleanDto[key] = input[key]
            }
        })
        const formated = this.utilsService.formatDateFields(cleanDto)
        return formated
    }
}
