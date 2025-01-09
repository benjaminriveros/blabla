import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {

    private readonly idPattern = /^\d{7,8}-(k|K|\d)$/;

    removeAccents(str: string): string {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }    
    
    validateId(id: string): boolean {
        if (!this.idPattern.test(id)) return false
        //validar digito verificador
        return true
    }

    formateDate(date: string): Date {
        const [day, month, year] = date.split('-');
        const formattedDay =  `${year}-${month}-${day}`;
        return new Date(formattedDay)
    }
}
