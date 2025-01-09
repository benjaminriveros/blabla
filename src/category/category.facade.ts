import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CategoryDal } from "./category.dal";
import { CreateCategoryDto, FindAllQueryDto, ResponseAllCategoryDto, ResponseCategoryDto, SearchNameOrIdCategoryDto, UpdateCategoryDto } from "./category.dto";

@Injectable()
export class CategoryFacade {
constructor(private readonly categoryDal: CategoryDal){}

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<ResponseCategoryDto> {
        // 1. Verificar si ya existe la categoría con ese nombre
        const exists = await this.categoryDal.findOneByName(createCategoryDto.name);
        // 2. Si existe, retornar un error
        if(exists) throw new HttpException('Category already exists', HttpStatus.CONFLICT);
        // 3. Si no existe, crear la categoría y retornarla
        return this.categoryDal.createCategory(createCategoryDto);
    }

    async getCategory(searchNameOrIdCategoryDto: SearchNameOrIdCategoryDto): Promise<any> {
        // 0. verificar que se proporcione al menos un criterio de búsqueda
        if (!searchNameOrIdCategoryDto.id && !searchNameOrIdCategoryDto.name) {
            throw new HttpException('Missing search criteria', HttpStatus.BAD_REQUEST);
        }
        // 1. Si se proporciona el id, buscar por id
        if (searchNameOrIdCategoryDto.id) {
            const categoryFound = await this.categoryDal.findOneById(searchNameOrIdCategoryDto.id);
            if(searchNameOrIdCategoryDto.name && searchNameOrIdCategoryDto.name !== categoryFound.name) {
                throw new HttpException('Id and name inconsistent', HttpStatus.BAD_REQUEST);
            }
            return categoryFound
        }
        // 2. Si se proporciona el nombre, buscar por nombre
        if (searchNameOrIdCategoryDto.name) {
            return this.categoryDal.findOneByName(searchNameOrIdCategoryDto.name);
        }
    }

    async getAllCategories(findAllQueryDto: FindAllQueryDto): Promise <ResponseAllCategoryDto[]>{
        if (isNaN(findAllQueryDto.page) || isNaN(findAllQueryDto.limit)) throw new HttpException('Invalid page or limit', HttpStatus.BAD_REQUEST);
        return this.categoryDal.findAll(findAllQueryDto);
    }

    async updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<ResponseCategoryDto> {
        // 0. Si 'name' y 'tasks' están vacíos, retornar un error
        if (!updateCategoryDto.name && !updateCategoryDto.tasks) throw new HttpException('Nothing to update', HttpStatus.BAD_REQUEST);
        // 1. Si la categoría no existe, retornar un error
        if(!this.categoryDal.findOneById(updateCategoryDto.id)) throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        // 2. Si existe, actualizar la categoría y retornarla
        return this.categoryDal.updateCategory(updateCategoryDto);
    }

    async deleteCategory(): Promise<any> {
        return
    }
}