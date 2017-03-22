import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateTimeFormat'
})
export class DateTimeFormatPipe implements PipeTransform {
    transform(value) {
        if (!value) { return ''; }
        return value.format('MMMM Do YYYY,h:mm:ss a');
        
    }


}