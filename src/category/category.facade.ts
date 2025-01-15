import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CategoryDal } from "./category.dal";
import { CreateCategoryDto, FindAllQueryDto, ResponseCategoryDto, UpdateCategoryDto } from "./category.dto";

@Injectable()
export class CategoryFacade {
    constructor(private readonly categoryDal: CategoryDal) { }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<ResponseCategoryDto> {

        const exists = await this.categoryDal.findOneByName(createCategoryDto.name);
        if (exists) {
            throw new HttpException('Category already exists', HttpStatus.CONFLICT);
        }
        
        return this.categoryDal.createCategory(createCategoryDto);
    }

    async getCategoryById(id: number): Promise<ResponseCategoryDto> {

        return this.getThrow(id)
    }

    async getAllCategories(findAllQueryDto: FindAllQueryDto): Promise<ResponseCategoryDto[]> {

        return this.categoryDal.findAll(findAllQueryDto);
    }

    async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<ResponseCategoryDto> {

        const category = await this.getThrow(updateCategoryDto.id)

        return this.categoryDal.updateCategory(updateCategoryDto);
    }

    async deleteCategory(id: number): Promise<ResponseCategoryDto> {

        const category = await this.getThrow(id)

        return this.categoryDal.deleteCategory(id)
    }

    private async getThrow(id: number) {

        const category = await this.categoryDal.findOneById(id)

        if (!category) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }

        return category
    }
}