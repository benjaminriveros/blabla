import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserDal } from "./user.dal";
import { CreateUserDto } from "./user.dto";
import { UtilsService } from "src/utils/utils.service";
import { ResponseUserDto } from "./user.dto.js"

@Injectable()
export class UserFacade {
    constructor(private readonly userDal: UserDal, private readonly utilsService: UtilsService){}

    async createUser(createUserDto: CreateUserDto): Promise <any> {
        createUserDto.updatedAt = new Date()
        if(!this.utilsService.validateId(createUserDto.id)) throw new HttpException('Invalid Id (RUN)', HttpStatus.BAD_REQUEST)
        if(await this.userDal.findUserById(createUserDto.id)) throw new HttpException('Id (RUN) already exists', HttpStatus.BAD_REQUEST)
        return this.userDal.createUser(createUserDto) 
    }


}