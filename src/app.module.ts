import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UtilsService } from './utils/utils.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [TasksModule, CategoriesModule],
  controllers: [CategoriesController],
  providers: [UtilsService, CategoriesService],
})
export class AppModule {}
