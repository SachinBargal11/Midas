import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ProgressBarService {
    counter: number = 0;
    constructor() { }
    start() {
        this.counter++;
    }
    stop() {
        this.counter--;
    }
}