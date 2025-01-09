import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./user.dto";

@Injectable()
export class UserDal{
    constructor(private readonly prisma: PrismaService){}

    async createUser(createUserDto: CreateUserDto): Promise <any> {
        return this.prisma.user.create({
            data: createUserDto
        })
    }

    async findUserById(id: string): Promise <boolean> {
        const exists = await this.prisma.user.findUnique({
            where: {
                id
            }
        })
        if(exists) return true
        return false
    }
}