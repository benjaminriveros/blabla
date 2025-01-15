import { ApiProperty } from "@nestjs/swagger";
import { ArrayUnique, IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskResponseDto } from "src/tasks/task.dto.js";
import { UserStatus } from "../enum/UserStatus.js";

export class CreateUserDto {

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
    birthDate: Date;

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
export class QueryFindByName {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    page: number = 1;

    @IsString()
    @IsNotEmpty()
    limit: number = 5;
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
    birthDate?: Date;

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

export class UserResponseDto {
    id: number;
    name: string;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}

export class UserWithTasksResponseDto {
    id: number;
    name: string;
    tasks: TaskResponseDto[];

    constructor(partial: Partial<UserWithTasksResponseDto>) {
        Object.assign(this, partial)
        if (this.tasks) {
            this.tasks = this.tasks.map(
                task => new TaskResponseDto(task))
        }
    }
}
