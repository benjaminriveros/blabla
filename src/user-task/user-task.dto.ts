export class UserTaskResponseDto {
    id: number;
    userId: number;
    taskId: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<UserTaskResponseDto>) {
        Object.assign(this, partial);
    }
}
