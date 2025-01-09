import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserDal } from "./user.dal";
import { CreateUserDto, QueryFindByName, QueryUpdateUserDto } from "./user.dto";
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

    async finduserById(id: string): Promise<ResponseUserDto> {
        if(!this.utilsService.validateId(id)) throw new HttpException('Invalid Id (RUN)', HttpStatus.BAD_REQUEST)
        const exists = await this.userDal.findUserById(id)
        if(!exists) throw new HttpException('Id (RUN) does not exist', HttpStatus.NOT_FOUND)
        return exists
    }

    async findUserByName(queryFindByName: QueryFindByName): Promise<ResponseUserDto[]> {
        const exists = await this.userDal.findUserByName(queryFindByName)
        if(!exists) throw new HttpException('Name does not exist', HttpStatus.NOT_FOUND)
        return exists
    }

    async updateUser(id:string, queryUpdateUserDto: QueryUpdateUserDto):Promise<any>{
        if(!this.utilsService.validateId(id)) throw new HttpException('Invalid Id (RUN)', HttpStatus.BAD_REQUEST)
        const exists = await this.userDal.findUserById(id)
        if(!exists) throw new HttpException('Id (RUN) does not exist', HttpStatus.NOT_FOUND)
        //buscar que existan las tasks que quiere relacionar, si existen, traer el id de TaskUser que relacionará
        return this.userDal.updateUser(id, queryUpdateUserDto)
    }

}