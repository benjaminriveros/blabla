import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"


export class TaskResponseDto {
    id: string
}

export class TaskCreateDto {

}

export class TaskUpdateDto extends TaskCreateDto {
    id: string
}

export class TaskParamDeleteDto {
    @ApiProperty({
        description: 'Id of task to delete',
        example: "6",
        type: String,
        required: true,
      })
    @IsString()
    id:string
}

export class TaskQueryFindAllDto {
    @ApiProperty({
        description: 'Page number for pagination',
        example: 1,
        type: Number,
        required: true,
      })
    @IsNumber()
    page: number;
    @ApiProperty({
        description: 'Number of tasks per page',
        example: 10,
        type: Number,
        required: true,
      })
    @IsNumber()
    limit: number
}