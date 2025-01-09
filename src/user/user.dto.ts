import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsEnum, IsDate, IsInt, Min, Max, IsArray, ArrayUnique } from "class-validator";
import { UserStatus } from "../enum/UserStatus.js"

export class CreateUserDto {
    @ApiProperty({
        description: 'The user\'s identification number (RUN), without dots and with a hyphen',
        example: '12345678-2',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    id: string;
    

    @ApiProperty({
      description: 'The first name of the user',
      example: 'John',
      required: true
    })
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty({
      description: 'The last name of the user (optional)',
      example: 'Doe',
      required: false,
    })
    @IsString()
    @IsOptional()
    surName?: string;
  
    @ApiProperty({
      description: 'The birth date of the user',
      example: '15-05-1990',
      required: true
    })
    @IsNotEmpty()
    birthDate: any;

    @ApiProperty({
        description: 'Updated date (automatically set)',
        example: '2025-01-01T00:00:00.000Z',
        required: false
      })
    updatedAt: Date;
    
    @ApiProperty({
      description: 'The status of the user',
      example: 'ACTIVE',
      enum: UserStatus,
      default: 'ACTIVE',
      required: false
    })
    @IsEnum(UserStatus)
    @IsOptional()
    status?: UserStatus;
}
export class ResponseUserTaskDto {

    @ApiProperty({
        description: 'Id of the relation user-task',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'ID of the task associated with this user',
        example: 1,
    })
    taskId: number;
  
    @ApiProperty({
        description: 'The user\'s identification number (RUN), without dots and with a hyphen',
        example: '12345678-2'
    })
    userId: string;
  
    @ApiProperty({
        description: 'The date when the user-task relationship was created',
        example: '2025-01-01T00:00:00.000Z',
    })
    createdAt: Date;
  
    @ApiProperty({
        description: 'Updated date (automatically set)',
        example: '2025-01-01T00:00:00.000Z',
        required: false
      })
    updatedAt: Date;
}
export class ResponseUserDto {

    @ApiProperty({
        description: 'The user\'s identification number (RUN), without dots and with a hyphen',
        example:  '12345678-2'
    })
    id: string;

    @ApiProperty({
        description: 'Name of the user',
        example: 'John'
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Surname of the user',
        example: 'Doe',
        required: false
    })
    @IsOptional()
    @IsString()
    surName?: string;

    @ApiProperty({
        description: 'Birthdate of the user',
        example: '22-01-1990'
    })
    @IsString()
    birthDate: Date;

    @ApiProperty({
        description: 'Status of the user',
        enum: UserStatus,
        example: 'ACTIVE'
    })
    @IsEnum(UserStatus)
    status: UserStatus;

    @ApiProperty({
        description: 'Date when the user was created',
        example: '2025-01-01T00:00:00.000Z'
    })
    @IsString()
    createdAt: Date;

    @ApiProperty({
        description: 'Date when the user was last updated',
        example: '2025-01-01T00:00:00.000Z'
    })
    @IsString()
    updatedAt: Date;

    @ApiProperty({
        description: 'List of tasks associated with the user',
        type: [ResponseUserTaskDto],
    })
    task: ResponseUserTaskDto[];
}
export class QueryFindByName {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    page: string = "1"; // Valor por defecto si no se pasa en la URL
  
    @IsString()
    @IsNotEmpty()
    limit: string = "5"; // Valor por defecto si no se pasa en la URL
}
export class QueryUpdateUserDto {
    @ApiProperty({
        description: 'Name of User',
        example: 'Juan',
        type: String,
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        description: 'Surname of user',
        example: 'Pérez',
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    surName?: string;

    @ApiProperty({
        description: 'Birthday of user',
        example: '19-05-2000',
        type: String,
    })
    @IsOptional()
    birthDate?: any;

    @ApiProperty({
        description: 'Status of user',
        enum: UserStatus,
        example: UserStatus.ACTIVE,
    })
    @IsEnum(UserStatus)
    @IsOptional()
    status?: UserStatus;

    @ApiProperty({
        description: 'ID\'s of TaskUser',
        type: [Number],
        example: [1, 2, 3],
    })
    @IsArray()
    @ArrayUnique()
    @IsInt({ each: true })
    @IsOptional()
    tasks?: number[];
}
export class UserTaskDto {
    id: number;             // ID de la relación entre el usuario y la tarea
    createdAt: Date;        // Fecha de creación de la relación
    updatedAt: Date;        // Fecha de la última actualización de la relación
    taskId: number;         // ID de la tarea asociada
    userId: string;         // ID del usuario asociado
    task: {                 // Información de la tarea asociada
      id: number;           // ID de la tarea
      title: string;        // Título de la tarea
      description: string;  // Descripción de la tarea
      day: string;          // Día de la tarea
      hour: string;         // Hora de la tarea
      dayFinish: string | null; // Día de finalización de la tarea
      isCompleted: boolean; // Estado de completitud de la tarea
    };
    user: {                 // Información del usuario asociado
      id: string;           // ID del usuario
      name: string;         // Nombre del usuario
      surName: string | null; // Apellido del usuario
    };
  }
  