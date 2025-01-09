import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategoryDto, FindAllQueryDto, ResponseAllCategoryDto, ResponseCategoryDto, UpdateCategoryDto } from "./category.dto";
import { ResponseTaskDto } from "src/tasks/task.dto";
import { connect } from "http2";

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
        if (!found) throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
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
        //Si no se encuentra la categoría, retornar error not found
        if (!found) return null
        const responseCategoryDto = new ResponseCategoryDto();
        responseCategoryDto.id = found.id;
        responseCategoryDto.name = found.name;
        // Mapear las tareas usando el constructor de ResponseTaskDto
        responseCategoryDto.tasks = found.tasks.map(task => new ResponseTaskDto(task));

        return responseCategoryDto;
    }
    async findAll(findAllQueryDto: FindAllQueryDto):Promise<ResponseAllCategoryDto[]>{
        const page = findAllQueryDto.page;
        const limit = findAllQueryDto.limit;
        const found = await this.prisma.category.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                tasks: true
            }
        })
        return found.map(found => new ResponseAllCategoryDto(found));
    }

    async updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<ResponseCategoryDto>{
        const data: any = {};
        if(updateCategoryDto.name) data.name = updateCategoryDto.name;

        if(updateCategoryDto.tasks){
            // agregar las tareas asociadas
            data.tasks = {
                set: updateCategoryDto.tasks.map(task => ({id:task.id}))
            }
        }
        
        const updated = await this.prisma.category.update({
            where:{
                id: updateCategoryDto.id
            },
            data,
            include: { 
                tasks: true
            }
        })
        // Mapear respuesta para retornarla
        const responseCaegoryDto: ResponseCategoryDto ={
            id: updated.id,
            name: updated.name,
            tasks: updated.tasks.map(task => new ResponseTaskDto(task))
        }
        return responseCaegoryDto;
    }

    async deleteCategory(id: number): Promise<ResponseCategoryDto>{
        const deleted = await this.prisma.category.delete({
            where :{
                id
            },
            include: {
                tasks: true
            }
        })
        // Mapear respuesta para retornar
        const responseCategoryDto: ResponseCategoryDto = {
            id: deleted.id,
            name: deleted.name,
            tasks: deleted.tasks.map(task => new ResponseTaskDto(task))
        }

        return responseCategoryDto
    }
}