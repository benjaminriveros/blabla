import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ResponseCategoryDto, CreateCategoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
    @Post()
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<ResponseCategoryDto> {
        return this.categoryService.createCategory(createCategoryDto);
    }
}
