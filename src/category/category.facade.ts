import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CategoryDal } from "./category.dal";
import { CreateCategoryDto, ResponseCategoryDto } from "./category.dto";

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
}