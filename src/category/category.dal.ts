import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategoryDto, FindAllQueryDto, ResponseCategoryDto, ResponseCategoryWithTasksDto, UpdateCategoryDto } from "./category.dto";

@Injectable()
export class CategoryDal {
    constructor(private readonly prisma: PrismaService) { }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<ResponseCategoryDto> {

        const created = await this.prisma.category.create({
            data: {
                name: createCategoryDto.name
            },
            include: {
                tasks: true
            }
        });
        
        return new ResponseCategoryDto(created);
    }

    async findOneById(id: number): Promise<ResponseCategoryDto> {

        const found = await this.prisma.category.findUnique({
            where: {
                id: id
            },
            include: {
                tasks: true
            }
        });

        return new ResponseCategoryDto(found);
    }

    async findOneByName(name: string): Promise<ResponseCategoryDto> {

        const found = await this.prisma.category.findFirst({
            where: {
                name: name
            },
            include: {
                tasks: true
            }
        })

        return new ResponseCategoryDto(found);
    }

    async findAll(findAllQueryDto: FindAllQueryDto): Promise<ResponseCategoryDto[]> {

        const found = await this.prisma.category.findMany({
            skip: (findAllQueryDto.page - 1) * findAllQueryDto.limit,
            take: findAllQueryDto.limit,
        })

        return found.map(found => new ResponseCategoryDto(found));
    }

    async updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<ResponseCategoryWithTasksDto> {

        const data: any = {};
        if (updateCategoryDto.name) data.name = updateCategoryDto.name;

        if (updateCategoryDto.tasks) {
            data.tasks = {
                set: updateCategoryDto.tasks.map(task => ({ id: task.id }))
            }
        }

        const updated = await this.prisma.category.update({
            where: {
                id: updateCategoryDto.id
            },
            data,
            include: {
                tasks: true
            }
        })
        
        return new ResponseCategoryWithTasksDto(updated)
    }

    async deleteCategory(id: number): Promise<ResponseCategoryDto> {
        
        const deleted = await this.prisma.category.delete({
            where: {
                id
            }
        })

        return new ResponseCategoryDto(deleted)
    }


}