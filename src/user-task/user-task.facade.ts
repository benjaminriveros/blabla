import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { TaskDal } from 'src/tasks/task.dal';
import { UserDal } from 'src/user/user.dal';
import { UserTaskDal } from './user-task.dal';
import { UserTaskResponseDto } from './user-task.dto';
@Injectable()
export class UserTaskFacade {
    constructor(
        private readonly userTaskDal: UserTaskDal,
        private readonly userDal: UserDal,
        private readonly taskDal: TaskDal,
    ) { }

    public async findUserTaskByuser(
        userId: number,
        taskId: number
    ): Promise<UserTaskResponseDto> {
        const found = await this.userTaskDal.findRelationByUserAndTask(userId, taskId)
        return found
    }

    public async createTaskUser(//TODO
        userIds: number[],
        taskId: number
    ): Promise<number> {

        const taskExists = await this.taskDal.getTaskById(taskId)
        if (!taskExists) {
            throw new NotFoundException('Task not found')
        }

        const users = await this.userDal.countUserById(userIds)
        if (users < userIds.length)
            throw new NotFoundException('Some user not found')

        const count = await this.userTaskDal.countUserTask(userIds, taskId)
        if (count > 0)
            throw new ConflictException('Some selationship user-task already exists')

        const created = await this.userTaskDal.createUserTask(userIds, taskId)
        return created
    }

    public async deleteRelation(id: number): Promise<UserTaskResponseDto> {

        const found = await this.userTaskDal.findUserTaskById(id)
        if (!found) {
            throw new NotFoundException('Relationship not found')
        }

        return this.userTaskDal.deleteRelation(id)
    }
}
