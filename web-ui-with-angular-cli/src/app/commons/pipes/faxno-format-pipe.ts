import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneFormat'
})
export class FaxNoFormatPipe implements PipeTransform {
    transform(value) {
        if (!value) { return ''; }
        value = String(value);
        let inputString = value.replace(/\-/g, '');
        return inputString.substring(0, 1) + '-' + inputString.substring(1, 4) + '-' + inputString.substring(4, 7) + ' ' + inputString.substring(7, 11);
    }
}