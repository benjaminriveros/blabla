import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { UserDal } from "./user.dal";
import { CreateUserDto, QueryFindByName, QueryUpdateUserDto, UserResponseDto } from "./user.dto";
import { UtilsService } from "src/utils/utils.service";
import { TaskResponseDto } from "src/tasks/task.dto";

@Injectable()
export class UserFacade {
    constructor(private readonly userDal: UserDal, private readonly utilsService: UtilsService) { }

    private async validateExistsId(id: number): Promise<UserResponseDto> {
        
        const exists = await this.userDal.findUserById(id)
        if (!exists) throw new HttpException('Id does not exist', HttpStatus.NOT_FOUND)
        return exists
    }

    public async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {

        const foundUser = await this.userDal.findUserById(createUserDto.id)
        if (foundUser) throw new HttpException('Id already exist', HttpStatus.CONFLICT)

        return this.userDal.createUser(createUserDto)
    }

    public async findUserById(id: number): Promise<UserResponseDto> {
        return this.validateExistsId(id)
    }

    public async findUserByName(queryFindByName: QueryFindByName): Promise<UserResponseDto[]> {

        const exists = await this.userDal.findUserByName(queryFindByName)
        if (!exists) throw new HttpException('Name does not exist', HttpStatus.NOT_FOUND)
        return exists
    }

    public async updateUser(id: number, queryUpdateUserDto: QueryUpdateUserDto): Promise<any> {

        this.validateExistsId(id)

        return this.userDal.updateUser(id, queryUpdateUserDto)
    }

    async getTasks(id: number): Promise<TaskResponseDto[]> {

        this.validateExistsId(id)

        return this.userDal.getTasks(id)

    }
}