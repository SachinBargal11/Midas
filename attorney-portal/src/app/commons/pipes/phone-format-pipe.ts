import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {
    transform(value) {
        if (!value) { return ''; }

        value = String(value);
        let inputString = value.replace(/\-/g, '');
        return inputString.substring(0, 2) + ' ' + inputString.substring(2, 5) + '-' + inputString.substring(5, 8) + '-' + inputString.substring(8, 12);
    }
}