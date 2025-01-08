import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategoryDto, ResponseCategoryDto } from "./category.dto";
import { ResponseTaskDto } from "src/tasks/task.dto";

@Injectable()
export class CategoryDal {
    constructor(private readonly prisma: PrismaService){}

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<ResponseCategoryDto> {
        const created = await this.prisma.category.create({
            data: {
                name: createCategoryDto.name
            }, 
            include: {
                tasks: true
            }
        });
        const responseCategoryDto = new ResponseCategoryDto();
        responseCategoryDto.id = created.id;
        responseCategoryDto.name = created.name;
        return responseCategoryDto;
    }

    async findOneById(id: number): Promise<ResponseCategoryDto>{
        const found = await this.prisma.category.findUnique({
            where: {
                id: id
            },
            include: {
                tasks: true
            }
        });
        const responseCategoryDto = new ResponseCategoryDto();
        responseCategoryDto.id = found.id;
        responseCategoryDto.name = found.name;
        // Mapear las tareas usando el constructor de ResponseTaskDto
        responseCategoryDto.tasks = found.tasks.map(task => new ResponseTaskDto(task));

        return responseCategoryDto;
    }

    async findOneByName(name: string): Promise<ResponseCategoryDto>{
        const found = await this.prisma.category.findFirst({
            where: {
                name: name
            },
            include: {
                tasks: true
            }
        })
        if(!found) return null;
        const responseCategoryDto = new ResponseCategoryDto();
        responseCategoryDto.id = found.id;
        responseCategoryDto.name = found.name;
        // Mapear las tareas usando el constructor de ResponseTaskDto
        responseCategoryDto.tasks = found.tasks.map(task => new ResponseTaskDto(task));

        return responseCategoryDto;
    }
}