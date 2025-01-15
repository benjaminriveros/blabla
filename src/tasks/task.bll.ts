import { BadRequestException, Injectable } from '@nestjs/common';
import { TaskDal } from '../tasks/task.dal';
import { TaskUpdateDto } from './task.dto';

@Injectable()
export class TaskBll {
    constructor(private readonly taskDal: TaskDal) { }

    public async updateTask(id: number, taskUpdateDto: TaskUpdateDto): Promise<any> {

        const date = (await this.taskDal.getTaskById(id)).day
        if (date > new Date()) {
            throw new BadRequestException('You cannot update a task from the future');
        }
        
        return this.taskDal.updateTask(id, taskUpdateDto);
    }
}