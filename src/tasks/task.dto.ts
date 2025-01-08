import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsOptional, IsBoolean, IsDateString, IsInt, IsNumber, IsNotEmpty } from "class-validator"
import { Transform } from "class-transformer"

export class TaskResponseDto {
    id: string
}

export class CreateTaskDto {
    @IsNumber()
    @IsOptional()
    id: Number;
    @ApiProperty({
        description: 'The title of the task',
        example: 'Complete the project',
    })
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @ApiProperty({
        description: 'The day the task should be performed',
        example: '2025-01-10',
    })
    @IsString()
    @IsNotEmpty()
    day: string;
  
    @ApiProperty({
        description: 'The day the task to be completed',
        example: '2025-01-15',
    })
    @IsString()
    @IsOptional() //Campo opcional
    dayFinish: string;
  
    @ApiProperty({
        description: 'The hour at which the task is scheduled',
        example: '14:00',
    })
    @IsString()
    @IsNotEmpty()
    hour: string;
  
    @ApiProperty({
        description: 'A description of the task',
        example: 'This task involves completing the final project report.',
    })
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @ApiProperty({
        description: 'Whether the task is completed or not',
        example: false,
        default: false,
    })
    @IsBoolean()
    @IsOptional() // Este campo es opcional, ya que tiene un valor predeterminado en el modelo
    isCompleted?: boolean;
  
    @ApiProperty({
        description: 'The ID of the category associated with the task',
        example: 1,
        required: false,
    })
    @IsInt()
    @IsOptional() // Este campo es opcional, ya que puede ser null
    categoryId?: number;

    // Constructor para mapear los datos de la base de datos al DTO
    constructor(task: any) {
        this.title = task.title;
        this.day = task.day;
        this.dayFinish = task.dayFinish || null;
        this.hour = task.hour;
        this.description = task.description;
        this.isCompleted = task.isCompleted ?? false; // Se asigna 'false' si no está presente
        this.categoryId = task.categoryId || null;
    }
  }

/*export class TaskUpdateDto extends CreateTaskDto {

} */

export class TaskParamDeleteDto {
    @ApiProperty({
        description: 'Id of task to delete',
        example: "6",
        type: String,
        required: true,
      })
    @IsString()
    id:string
}

export class TaskQueryFindAllDto {
    @ApiProperty({
        description: 'Page number for pagination',
        example: 1,
        type: Number,
        required: true,
      })
    @IsNumber()
    page: number;
    @ApiProperty({
        description: 'Number of tasks per page',
        example: 10,
        type: Number,
        required: true,
      })
    @IsNumber()
    limit: number
}

export class FindAllTaskDto {
  id: number;
  title: string;
  description: string;
  day: string;
  hour: string;
  dayFinish?: string | null; // Puede ser null si no está disponible
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  categoryId?: number | null; // Puede ser null si no tiene categoría asociada

  constructor(task: any) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.day = task.day;
    this.hour = task.hour;
    this.dayFinish = task.dayFinish;
    this.isCompleted = task.isCompleted;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
    this.categoryId = task.categoryId ?? null;
  }
}