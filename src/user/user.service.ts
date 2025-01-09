import { Injectable } from '@nestjs/common';
import { UserFacade } from './user.facade';
import { CreateUserDto, QueryFindByName, ResponseUserDto } from './user.dto';

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
}
