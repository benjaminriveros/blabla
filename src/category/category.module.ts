import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoryFacade } from './category.facade';
import { CategoryDal } from './category.dal';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryFacade, CategoryDal],
  imports: [PrismaModule],
})
export class CategoryModule {}
