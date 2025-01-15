import { PrismaService } from "src/prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UserTaskResponseDto } from "src/user-task/user-task.dto";

@Injectable()
export class UserTaskDal {
    constructor(private readonly prisma: PrismaService) { }

    public async createUserTask(userIds: number[], taskId: number): Promise<number> {
        const data = userIds.map(userId => ({
            userId,
            taskId
        }))
        const created = await this.prisma.userTask.createMany({
            data
        })
        return created.count
    }

    public async findRelationByUserAndTask(userId: number, taskId: number): Promise<UserTaskResponseDto> {
        const found = await this.prisma.userTask.findFirst({
            where: {
                userId,
                taskId
            }
        })
        return new UserTaskResponseDto(found)
    }

    public async findUserTaskById(id: number): Promise<UserTaskResponseDto> {
        return this.prisma.userTask.findFirst({
            where:{
                id
            }
        })
    }

    public async countUserTask(userIds: number[], taskId: number): Promise<number> {
        const count = await this.prisma.userTask.count({
            where: {
                userId: {
                    in: userIds
                },
                taskId
            }
        })
        return count
    }


    public async deleteRelation(id: number): Promise<UserTaskResponseDto> {

        const existingUserTask = await this.prisma.userTask.findFirst({
            where: { id }
        });

        if (!existingUserTask) {
            throw new NotFoundException(`UserTask with ID ${id} not found`);
        }

        const deleted = await this.prisma.userTask.delete({
            where: { id }
        });

        return new UserTaskResponseDto(deleted);
    }



}