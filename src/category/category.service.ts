import { Injectable } from '@nestjs/common';
import { CategoryFacade } from './category.facade';
import { CreateCategoryDto, ResponseCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryFacade: CategoryFacade) {}

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<ResponseCategoryDto> {
        return this.categoryFacade.createCategory(createCategoryDto);
    }
}
