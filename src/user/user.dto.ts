import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsEnum, IsDate } from "class-validator";
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
      description: 'The birth date of the user (ISO 8601 format)',
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
