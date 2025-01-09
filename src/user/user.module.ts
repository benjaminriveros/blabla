import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDal } from "./user.dal.js";
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserFacade } from './user.facade';
import { UtilsService } from 'src/utils/utils.service';


@Module({
  controllers: [UserController],
  providers: [UserService, UserDal, UserFacade, UtilsService],
  imports: [PrismaModule]
})
export class UserModule {}
