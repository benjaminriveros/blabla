import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UtilsService } from "src/utils/utils.service";
import { TaskFacade } from "./task.facade";
import { TaskDal } from "./task.dal";
@Module ({
    controllers: [TasksController],
    providers: [TaskFacade, TaskDal, TasksService, UtilsService],
    imports: [PrismaModule]
})
export class TasksModule {}