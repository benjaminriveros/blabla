import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, Tasks } from "@prisma/client";
import { UtilsService } from "../utils/utils.service.js";
import { TaskUpdateDto } from "./task.dto.js";

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService, private utilsService: UtilsService) {}

    async getAllTasks(page: number, limit: number): Promise<Tasks[]> {
    
        if (isNaN(page) || isNaN(limit)) {
          throw new Error('Los parámetros page y limit deben ser números válidos');
        }
        return this.prisma.tasks.findMany({
          skip: (page - 1) * limit,
          take: limit,
        });
      }

    async getTask(id?: string, title?: string, day?: string): Promise<Tasks> {

        const where: Prisma.TasksWhereInput = {};

        if(id){
            where.id = parseInt(id)
        }

        if (title) {
            where.title = {
              contains: this.utilsService.removeAccents(title),  // Búsqueda con expresión regular
              mode: 'insensitive',
            };
          }

        if(day) {
            where.day = day
        }
        console.log(where)

        return this.prisma.tasks.findFirst({
          where
        });
    }
    
    async createTask(data: Tasks): Promise<Tasks> {
        return this.prisma.tasks.create({
            data: data
        });
    }

    async updateTask(data:TaskUpdateDto): Promise<Tasks> {
        return this.prisma.tasks.update({
            where: {
                id: id
            }, data: data
        });
    }

    async deleteTask(id: number): Promise<Tasks> {
        return this.prisma.tasks.delete({
            where: {
                id: id
            }
        });
    }
}