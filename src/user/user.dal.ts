import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto, QueryFindByName, ResponseUserDto, ResponseUserTaskDto } from "./user.dto";
import { UserStatus } from "src/enum/UserStatus";
import { map } from "rxjs";

@Injectable()
export class UserDal{
    constructor(private readonly prisma: PrismaService){}

    private mapToResponseUserDto(exists: any): ResponseUserDto {
        return {
          id: exists.id,
          name: exists.name,
          birthDate: exists.birthDate,
          surName: exists.surName || null,
          status: exists.status as UserStatus,
          createdAt: exists.createdAt,
          updatedAt: exists.updatedAt,
          task: exists.task
            ? exists.task.map((userTask: any): ResponseUserTaskDto => {
                return {
                  id: userTask.id,
                  taskId: userTask.taskId,
                  userId: userTask.userId,
                  createdAt: userTask.createdAt,
                  updatedAt: userTask.updatedAt,
                  taskDetails: userTask.task
                } as ResponseUserTaskDto;
              })
            : [] // arreglo vacío si no hay tareas
        } as ResponseUserDto;
    }

    async createUser(createUserDto: CreateUserDto): Promise <ResponseUserDto> {
        const created = await this.prisma.user.create({
            data: createUserDto,
            include: {
                task: true
            }
        })
        return this.mapToResponseUserDto(created)
    }

    async findUserById(id: string): Promise <ResponseUserDto> {
        const exists = await this.prisma.user.findUnique({
            where: { id },
            include: {
              task: {
                include: {
                  task: true,
                },
              },
            },
          })
        if(!exists) return null
        return this.mapToResponseUserDto(exists)
    }
    async findUserByName(queryFindByName: QueryFindByName): Promise<ResponseUserDto[]>{
        const exists = await this.prisma.user.findMany({
        where:{
                name: {
                    contains: queryFindByName.name,
                    mode: 'insensitive'
                }
            },
        include: {
            task: true
            },
        skip: (Number(queryFindByName.page) - 1) * Number(queryFindByName.limit),
        take: Number(queryFindByName.limit),
        })
        if(exists.length == 0) return null
        const listUsers: ResponseUserDto[] = exists.map(user => this.mapToResponseUserDto(user))
        console.log(listUsers)
        return listUsers
    }
}