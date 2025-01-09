import { Injectable } from '@nestjs/common';
import { UserFacade } from './user.facade';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(private readonly userFacade: UserFacade){}

    async createUser(createUserDto: CreateUserDto): Promise<any> {
        return this.userFacade.createUser(createUserDto)
    }
}
