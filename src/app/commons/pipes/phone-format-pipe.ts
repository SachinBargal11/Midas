import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {
    transform(value) {
        if (!value) { return ''; }

        value = String(value);
        let inputString = value.replace(/\-/g, '');
        return inputString.substring(0, 3) + '-' + inputString.substring(3, 6) + '-' + inputString.substring(6, 10);
    }
}