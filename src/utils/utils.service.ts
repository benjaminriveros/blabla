import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {

    removeAccents(str: string): string {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    private formateDate(date: string): Date {
        const [day, month, year] = date.split('-');
        const formattedDay = `${year}-${month}-${day}`;
        return new Date(formattedDay)
    }

    public formatDateFields<T>(dto: T): T {
        ['day', 'dayFinish'].forEach(field => {
            if (dto[field]) {
                dto[field] = this.formateDate(dto[field])
            }
        })
        return dto
    }

}
