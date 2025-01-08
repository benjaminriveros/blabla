import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UtilsService } from './utils/utils.service';
import {CategoryModule} from './category/category.module'

@Module({
  controllers: [],
  imports: [TasksModule, CategoryModule],
  providers: [UtilsService],
})
export class AppModule {}
