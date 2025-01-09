import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UtilsService } from "src/utils/utils.service";
import { TaskFacade } from "./task.facade";
import { TaskDal } from "./task.dal";
import { CategoryDal } from "../category/category.dal.js";

@Module ({
    controllers: [TasksController],
    providers: [TaskFacade, TaskDal, CategoryDal, TasksService, UtilsService],
    imports: [PrismaModule]
})
export class TasksModule {}