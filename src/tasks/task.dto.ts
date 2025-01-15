import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDefined, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, ValidateIf } from "class-validator";
import { UserResponseDto } from "src/user/user.dto";

export class CreateTaskDto {
    @ApiProperty({
        description: 'Title of the task',
        example: 'Complete Homework',
        type: String,
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Description of the task',
        example: 'Finish the math assignment',
        type: String,
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Day of the task',
        example: '17-01-2025',
        type: String,
    })
    @IsString()
    day: string;

    @ApiProperty({
        description: 'Hour of the task',
        example: '18:00',
        type: String,
    })
    @IsString()
    hour: string;

    @ApiProperty({
        description: 'Finish day of the task, optional',
        example: '20-01-2025',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsString()
    dayFinish?: string;

    @ApiProperty({
        description: 'Status of the task',
        example: false,
        required: false,
        type: Boolean,
    })
    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean;

    constructor(partial: Partial<CreateTaskDto>) {
        Object.assign(this, partial)
    }
}
export class TaskUpdateDto {
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
    @IsNumber()
    @Matches(/^\d{2}-\d{2}-\d{4}$/, { message: 'Invalid date format. Use DD-MM-YYYY.' })
    day: string;

    @ApiProperty({
        description: 'The day the task should be finished. If not provided, the task does not have a defined end date.',
        example: '05-12-2025',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Matches(/^\d{2}-\d{2}-\d{4}$/, { message: 'Invalid date format. Use DD-MM-YYYY.' })
    dayFinish?: string;

    @ApiProperty({
        description: 'The time at which the task is scheduled.',
        example: '10:00',

        required: false,
    })
    @IsOptional()
    @IsString()
    @Matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/, {
        message: 'Invalid time format. Please use HH:mm (24-hour format).',
    })
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
export class TaskResponseDto {
    id: number;
    title: string;
    description: string;
    day: Date;
    hour: string;
    dayFinish?: Date;
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<TaskResponseDto>) {
        Object.assign(this, partial);
    }
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
export class TaskWithUsersResponseDto {
    task: TaskResponseDto;
    users: UserResponseDto[];

    constructor(task: TaskResponseDto, users: UserResponseDto[]) {
        this.task = task;
        this.users = users;
    }

}