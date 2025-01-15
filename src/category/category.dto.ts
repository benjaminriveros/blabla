import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { TaskResponseDto } from "src/tasks/task.dto";


export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class ResponseCategoryDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;
    constructor(category: ResponseCategoryDto) {
        Object.assign(category)
    }
}

export class FindAllQueryDto {
    @IsNumber()
    @IsOptional()
    page: number;

    @IsNumber()
    @IsOptional()
    limit: number;
}

export class UpdateCategoryDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @ApiProperty({
        description: 'The new name of the category',
        example: 'Updated Category Name',
        required: false,
    })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({
        description: 'List of task IDs to be associated with the category, this replace the current list',
        type: [Object],
        example: [{ id: 3 }, { id: 6 }],
        required: false,
    })
    @IsArray()
    @IsOptional()
    tasks?: { id: number }[];
}

export class CategoryParamDto {
    @ApiProperty()
    @IsNumber()
    id: number
}

export class CategoryByIdQueryDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    name?: string
}

export class CategoryFilterQueryDto {
    @ApiProperty()
    @IsNumber()
    page: number
    @ApiProperty()
    @IsNumber()
    limit: number
}
export class ResponseCategoryWithTasksDto {

    id: number;
    name: string;
    tasks: TaskResponseDto[]

    constructor(partial: Partial<ResponseCategoryWithTasksDto>) {

        Object.assign(this, partial)

        if (this.tasks) {
            this.tasks = partial.tasks.map(
                task => new TaskResponseDto(task)
            )
        }
    }
}