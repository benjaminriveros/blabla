import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsOptional, IsBoolean, IsInt, IsNumber, IsNotEmpty, ValidateIf, IsDefined } from "class-validator"

// DTO Base con los campos comunes
export class TaskBaseDto {
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
    description: 'The day the task should be completed',
    example: '2025-01-15',
  })
  @IsString()
  @IsOptional() // Campo opcional
  dayFinish?: string;

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
}
export class TaskUpdateDto {
  @ApiProperty({
    description: 'The unique identifier of the task provided by URL, not body.',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({
    description: 'The title of the task.',
    example: 'Updated Task Title',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'The day the task is scheduled to be performed.',
    example: '05-12-2025',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  day: string;

  @ApiProperty({
    description: 'The day the task should be finished. If not provided, the task does not have a defined end date.',
    example: '05-12-2025',
    required: false,
  })
  @IsOptional()
  @IsString()
  dayFinish?: string;

  @ApiProperty({
    description: 'The time at which the task is scheduled.',
    example: '10:00',
    required: false,
  })
  @IsOptional()
  @IsString()
  hour?: string;

  @ApiProperty({
    description: 'A description of the task. Provides more details about the task.',
    example: 'This is an updated description for the task.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Whether the task is completed or not.',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @ApiProperty({
    description: 'The ID of the (existing) category to associate with the task.',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsInt()
  categoryId?: number;

}
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
export class TaskFindOneDto {
  @ValidateIf((o) => !o.title && !o.day)
  @IsString()
  @IsDefined()
  id?: number;

  @ValidateIf((o) => !o.id && !o.day)
  @IsString()
  @IsDefined()
  title?: string;

  @ValidateIf((o) => !o.id && !o.title)
  @IsString()
  @IsDefined()
  day?: string;
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
// DTO para crear una tarea
export class CreateTaskDto extends TaskBaseDto {
  @IsNumber()
  @IsOptional()
  id: number;

  // Constructor para mapear los datos de la base de datos al DTO
  constructor(task: any) {
    super(); // Llamada al constructor de la clase base
    this.title = task.title;
    this.day = task.day;
    this.dayFinish = task.dayFinish || null;
    this.hour = task.hour;
    this.description = task.description;
    this.isCompleted = task.isCompleted ?? false;
    this.categoryId = task.categoryId || null;
  }
}
// DTO para la respuesta de la búsqueda de tareas
export class ResponseTaskDto extends TaskBaseDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(task: any) {
    super(); // Llamada al constructor de la clase base
    // Mapear todos los campos desde el objeto `task` a las propiedades del DTO
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
