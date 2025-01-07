import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
    removeAccents(str: string): string {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }      
}
