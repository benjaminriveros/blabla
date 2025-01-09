import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf, IsDefined } from "class-validator";
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
    @IsNotEmpty()
    tasks: ResponseTaskDto[];
}

export class ResponseAllCategoryDto {
    constructor(category: any) {
        // Mapeo de los datos de la categoría recibida
        this.id = category.id;
        this.name = category.name;
        // Mapeamos las tareas, si existen
        this.tasks = category.tasks ? category.tasks.map(task => new ResponseTaskDto(task)) : [];
    }
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    tasks: ResponseTaskDto[];
}

export class SearchNameOrIdCategoryDto {
  @ValidateIf((o) => !o.name)
  @IsString()
  @IsDefined()
  id?: number;

  @ValidateIf((o) => !o.id)
  @IsString()
  @IsDefined()
  name?: string;
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

    @IsString()
    @IsOptional()
    name: string;

    @IsArray()
    @IsOptional()
    tasks: ResponseTaskDto[];
}
