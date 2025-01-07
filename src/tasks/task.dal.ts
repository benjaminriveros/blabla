import { Injectable } from '@nestjs/common';
import { TaskCreateDto } from './task.dto';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TaskDal {
    constructor(private prisma: PrismaService) {}

    async create(createTaskDto: TaskCreateDto) {
    // Lógica para insertar una tarea en la base de datos
        //this.prisma.tasks.create()
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
        }) // Simulación de una tarea creada
    }
}
