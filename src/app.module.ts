import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UtilsService } from './utils/utils.service';
import {CategoryModule} from './category/category.module'
import { UserModule } from './user/user.module';
import { UserTaskModule } from './user-task/user-task.module';

@Module({
  controllers: [],
  imports: [TasksModule, CategoryModule, UserModule, UserTaskModule],
  providers: [UtilsService],
})
export class AppModule {}
