import { Injectable } from '@nestjs/common';
import { CategoryFacade } from './category.facade';
import { CreateCategoryDto, ResponseAllCategoryDto, ResponseCategoryDto, SearchNameOrIdCategoryDto, FindAllQueryDto, UpdateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryFacade: CategoryFacade) {}

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<ResponseCategoryDto> {
        return this.categoryFacade.createCategory(createCategoryDto);
    }

    async getCategory(searchNameOrIdCategoryDto: SearchNameOrIdCategoryDto): Promise<ResponseCategoryDto> {
        return this.categoryFacade.getCategory(searchNameOrIdCategoryDto);
    }
    async getAllCategories(findAllQueryDto: FindAllQueryDto): Promise<ResponseAllCategoryDto[]> {
        return this.categoryFacade.getAllCategories(findAllQueryDto);
    }
    async updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<ResponseCategoryDto> {
        return this.categoryFacade.updateCategory(updateCategoryDto);
    }
    async deleteCategory(): Promise<any> {
        return
    }

}