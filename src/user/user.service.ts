import { Injectable } from '@nestjs/common';
import { UserFacade } from './user.facade';
import { CreateUserDto, ResponseUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(private readonly userFacade: UserFacade){}

    async createUser(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
        return this.userFacade.createUser(createUserDto)
    }

    async findUserById(id:string): Promise<ResponseUserDto> {
        return this.userFacade.finduserById(id)
    }
}
