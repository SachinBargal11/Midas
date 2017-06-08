import {Pipe} from '@angular/core';

@Pipe({
    name: 'limit'
})
export class LimitPipe {
    transform(value) {
        return value.slice(0, 10);
    }
}