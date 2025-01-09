import { ApiProperty } from "@nestjs/swagger";
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
    @IsOptional() // El id es opcional ya que viene en el URL
    id: number;

    @ApiProperty({
        description: 'The new name of the category',
        example: 'Updated Category Name',
        required: false, // El nombre puede ser opcional dependiendo de cómo quieras manejarlo
    })
    @IsString()
    @IsOptional() // El nombre es opcional si no lo actualizas
    name: string;

    @ApiProperty({
        description: 'List of task IDs to be associated with the category, this replace the current list',
        type: [Object], // Indica que es un arreglo de objetos
        example: [{ id: 3 }, { id: 6 }],
        required: false, // Este campo es opcional
    })
    @IsArray()
    @IsOptional() // Tareas opcionales si no las proporcionas
    tasks?: { id: number }[]; // Este es el tipo que esperamos (arreglo de objetos con un campo "id")
}