import { Injectable } from '@nestjs/common';
import { CreateTaskDto, TaskQueryFindAllDto, TaskFindOneDto, ResponseTaskDto, TaskUpdateDto } from './task.dto';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TaskDal {
    constructor(private prisma: PrismaService) {}

    async createTask(createTaskDto: CreateTaskDto) {
        // Desestructuración de los campos del DTO
        const { title, day, dayFinish, hour, description, isCompleted, categoryId } = createTaskDto;

        return this.prisma.tasks.create({
            data: {
                title,             // Título de la tarea
                day,               // Día en formato string (no hace falta convertir)
                dayFinish,         // Fecha de finalización en formato string (también es string)
                hour,              // Hora en formato string
                description,       // Descripción de la tarea
                isCompleted: isCompleted ?? false, // Si no se proporciona, se establece como `false` (valor por defecto)
                categoryId: categoryId ?? null,    // Si no se proporciona, se establece como `null` (campo opcional)    
            }
        }) 
    }

    // Para transformar los datos de la bd a DTO
    // o es mejor usar librería class-transformer?
    async getAllTasks(taskQueryFindAllDto: TaskQueryFindAllDto) {
        const { page, limit } = taskQueryFindAllDto;
        const tasks = await this.prisma.tasks.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
        return tasks.map(task => new ResponseTaskDto(task));
    }

    async getTask(taskFindOneDto: TaskFindOneDto) {
        const where: any = {};
        if (taskFindOneDto.id) where.id = taskFindOneDto.id;
        if (taskFindOneDto.title) where.title = taskFindOneDto.title;
        if (taskFindOneDto.day) where.day = taskFindOneDto.day;

        return this.prisma.tasks.findUnique({
            where
        });
    }

    async updateTask(taskUpdateDto: TaskUpdateDto){
        const { id, title, day, dayFinish, hour, description, isCompleted, categoryId } = taskUpdateDto;
        const data: any = {}
        // Solo asignamos los valores que no son undefined o null
        if (title !== undefined && title !== null) data.title = title;
        if (day !== undefined && day !== null) data.day = day;
        if (dayFinish !== undefined && dayFinish !== null) data.dayFinish = dayFinish;
        if (hour !== undefined && hour !== null) data.hour = hour;
        if (description !== undefined && description !== null) data.description = description;
        if (isCompleted !== undefined && isCompleted !== null) data.isCompleted = isCompleted;
        if (categoryId !== undefined && categoryId !== null) data.categoryId = categoryId;

        return this.prisma.tasks.update({
            where: {
                id
            },
            data
        });
    }
}
