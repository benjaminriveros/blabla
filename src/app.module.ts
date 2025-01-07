import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UtilsService } from './utils/utils.service';
import { CategoriesController } from './categories/categories.controller';

@Module({
  imports: [TasksModule],
  controllers: [CategoriesController],
  providers: [UtilsService],
})
export class AppModule {}
