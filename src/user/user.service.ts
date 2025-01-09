import { Injectable } from '@nestjs/common';
import { UserFacade } from './user.facade';
import { CreateUserDto, QueryFindByName, QueryUpdateUserDto, ResponseUserDto } from './user.dto';
import { UpdateCategoryDto } from 'src/category/category.dto';

@Injectable()
export class UserService {
    constructor(private readonly userFacade: UserFacade){}

    async createUser(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
        return this.userFacade.createUser(createUserDto)
    }

    async findUserById(id:string): Promise<ResponseUserDto> {
        return this.userFacade.finduserById(id)
    }

    async findUserByname(queryFindByName: QueryFindByName): Promise<ResponseUserDto[]> {
        return this.userFacade.findUserByName(queryFindByName)
    }

    async updateUser(id:string, queryUpdateUserDto: QueryUpdateUserDto): Promise <any> {
        return this.userFacade.updateUser(id, queryUpdateUserDto)
    }
}
