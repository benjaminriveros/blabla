import { Body, Controller, Post, Get, Put, Delete, Query, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ResponseCategoryDto, CreateCategoryDto, SearchNameOrIdCategoryDto, FindAllQueryDto, UpdateCategoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
    @Post()
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<ResponseCategoryDto> {
        return this.categoryService.createCategory(createCategoryDto);
    }
    @Get()
    async getCategory(@Query() queryParams: { id?: string; name?: string}): Promise<any> {
        const searchNameOrIdCategoryDto = new SearchNameOrIdCategoryDto();
        searchNameOrIdCategoryDto.id = queryParams.id ? Number(queryParams.id) : undefined;
        searchNameOrIdCategoryDto.name = queryParams.name;
        return this.categoryService.getCategory(searchNameOrIdCategoryDto);
    }

    @Get('all')
    async getAllCategories(@Query() queryParams: { page: string; limit: string }): Promise<ResponseCategoryDto[]> {
      const page = Number(queryParams.page);
      const limit = Number(queryParams.limit);
  
      const findAllQueryDto = new FindAllQueryDto();
      findAllQueryDto.page = page;
      findAllQueryDto.limit = limit;
  
      return this.categoryService.getAllCategories(findAllQueryDto);
    }

    @Put(':id')
    async updateCategory(
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Param('id') id: string
    ): Promise<ResponseCategoryDto> {
        updateCategoryDto.id = Number(id);
        return this.categoryService.updateCategory(updateCategoryDto);
    }

    @Delete(':id')
    async deleteCategory(@Param('id') id: string ): Promise<ResponseCategoryDto> {
        return this.categoryService.deleteCategory(Number(id))
    }
}
