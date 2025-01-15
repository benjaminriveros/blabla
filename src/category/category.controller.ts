import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CategoryFilterQueryDto, CategoryParamDto, CreateCategoryDto, ResponseCategoryDto, UpdateCategoryDto } from './category.dto';
import { CategoryFacade } from './category.facade';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryFacade: CategoryFacade) { }

    @Get()
    async getAllCategories(
        @Query() query: CategoryFilterQueryDto
    ): Promise<ResponseCategoryDto[]> {

        return this.categoryFacade.getAllCategories(query);
    }

    @Post()
    async createCategory(
        @Body() createCategoryDto: CreateCategoryDto
    ): Promise<ResponseCategoryDto> {

        return this.categoryFacade.createCategory(createCategoryDto);
    }

    @Get(":id")
    async getCategory(
        @Param() { id }: CategoryParamDto
    ): Promise<ResponseCategoryDto> {

        return this.categoryFacade.getCategoryById(id);
    }

    @Put(':id')
    async updateCategory(
        @Param() { id }: CategoryParamDto,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ): Promise<ResponseCategoryDto> {

        return this.categoryFacade.updateCategory(id, updateCategoryDto);
    }

    @Delete(':id')
    async deleteCategory(
        @Param() param: CategoryParamDto
    ): Promise<ResponseCategoryDto> {

        return await this.categoryFacade.deleteCategory(param.id)
    }
}
