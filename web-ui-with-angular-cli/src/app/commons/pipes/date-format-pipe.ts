import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
    transform(value) {
        if (!value) { return ''; }
     return  value.format('Do MMM YYYY')
         
    }
}