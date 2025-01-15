import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TaskResponseDto } from "src/tasks/task.dto";
import { CreateUserDto, QueryFindByName, QueryUpdateUserDto, UserResponseDto } from "./user.dto";

@Injectable()
export class UserDal {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const created = await this.prisma.user.create({
            data: createUserDto
        })
        return new UserResponseDto(created)
    }

    async findUserById(id: number): Promise<UserResponseDto> {
        const exists = await this.prisma.user.findUnique({
            where: { id }
        })
        return new UserResponseDto(exists)
    }

    async countUserById(ids: number[]): Promise<number> {
        const count = await this.prisma.user.count({
            where: {
                id: {
                    in: ids
                }
            }
        })
        return count
    }

    async findUserByName(queryFindByName: QueryFindByName): Promise<UserResponseDto[]> {
        const found = await this.prisma.user.findMany({
            where: {
            name: {
                    contains: queryFindByName.name,
                    mode: 'insensitive'
                }
            },
            skip: (queryFindByName.page - 1) * queryFindByName.limit,
            take: queryFindByName.limit,
        })
        const result = found.map(user => new UserResponseDto(user))
        return result
    }

    async updateUser(id: number, queryUpdateUserDto: QueryUpdateUserDto): Promise<UserResponseDto> {
        const updated = await this.prisma.user.update({
            where: {
                id
            },
            data: queryUpdateUserDto
        })
        return new UserResponseDto(updated)
    }

    async getTasks(id: number): Promise<TaskResponseDto[]> {
        const found = await this.prisma.user.findFirst({
            where: { id },
            include: {
                userTask: {
                    include: {
                        task: true
                    }
                }
            }
        })
        const tasks = found.userTask.map(userTask => userTask.task)
        return tasks.map(task => new TaskResponseDto(task))
    }
}