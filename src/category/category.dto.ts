import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ResponseTaskDto } from "src/tasks/task.dto";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class ResponseCategoryDto{
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    tasks: ResponseTaskDto[];
}