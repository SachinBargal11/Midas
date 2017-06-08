import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ProgressBarService {
    counter: number = 0;
    blockedApp = false;
    constructor() { }
    show() {
        this.counter++;
        this.blockedApp = true;
    }
    hide() {
        this.counter = 0;
        this.blockedApp = false;
    }
}